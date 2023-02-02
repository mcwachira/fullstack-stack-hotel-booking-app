const express = require('express')
const { registerUser, logInUser } = require('../controllers/auth/auth.Controller')
const authValidation = require('../controllers/auth/auth.validator')
const router = express.Router()


router.post('/auth/register', authValidation, registerUser)
router.post('/auth/login', logInUser)

module.exports = router