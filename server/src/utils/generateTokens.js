const jwt = require('jsonwebtoken')

//a function to generate our token
const generateAccessToken = (user) => {
    // console.log('hello user', user)
    return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN, {
        expiresIn: "15m"
    })

}


//function to refresh our generated token
const generateRefreshToken = (user) => {
    // console.log(user)
    return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN, {
        expiresIn: "1d"
    })

}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}