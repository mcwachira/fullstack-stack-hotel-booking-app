const joi = require('joi');
// const errorFunction = require('../../utils/errorFunction')
// const { logError } = require('../../errorHandling/errorHandler')

// const AppError = require('../../utils/appError')


const validation = joi.object({
    username: joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required()
})

const userValidation = async (req, res, next) => {
    const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const { error } = validation.validate(payload)

    if (error) {
        res.status(406)
        return res.json(
            // logError(error)

            error
            // next(new AppError(`Error in User Data : ${error.message}`, 406))
        )
    } else {
        next()
    }
}

module.exports = userValidation