const Joi = require('joi');
// const errorFunction = require('../../utils/errorFunction')

// const AppError = require('../../utils/appError')

const validation = Joi.object({
    username: Joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
})

const authValidation = async (req, res, next) => {
    const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const { error } = validation.validate(payload)

    if (error) {

        error
        // next(new AppError(`Error in User Data : ${error.message}`, 406))


    } else {
        next()
    }
}

module.exports = authValidation