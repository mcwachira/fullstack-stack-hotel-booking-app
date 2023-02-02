const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;


    if (!token) {
        return res.status(401).json({ message: 'You are not Authenticated' })
        next()
    }


    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'token is not valid' })
            next()
        }

        req.user = user;
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        console.log(user)

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()

        } else {
            return res.status(401).json({ message: 'you are not authorized' })

        }
    })
}

const verifyIsAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {

        if (req.user.isAdmin) {
            next()

        } else {
            return res.status(401).json({ message: 'you are not authorized' })

        }
    })
}

module.exports = {
    verifyToken,
    verifyUser,
    verifyIsAdmin
}