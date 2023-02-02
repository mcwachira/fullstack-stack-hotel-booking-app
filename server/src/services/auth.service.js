const bcrypt = require('bcrypt')
const User = require('../models/User')

const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens.js')



const registerUser = async (newUser) => {
    const { username, email, password } = newUser

    //check for existing user or duplicates
    //.exec() enables use to get a promise back

    try {
        const duplicateUser = await User.findOne({ username }).exec()
        if (duplicateUser) {
            throw Error('username already in use')
            // return


        }


    } catch (error) {
        // throw Error(error)
        console.log(error)
    }

    //check if  email has already exist in the database


    const emailExist = await User.findOne({ email }).exec()

    if (emailExist) {
        throw Error('email already in use')



    }




    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10) //salt rounds 10
    const userObject = {
        "username": username,
        email: email,
        'password': hashedPassword,


    }
    const user = await User.create(userObject)

    if (user) {

        return user
    } else {
        throw Error('user not created')

    }


}



const logInUser = async (loggedUser) => {
    const { email, password } = loggedUser
    console.log(password)


    //check if email exist


    const user = await User.findOne({ email })
    // console.log(user)

    if (!user) {

        throw Error('user with that email does not exist')

    }

    //check if password is valid
    const validate = await bcrypt.compare(password, user.password)
    if (user && validate === false) {

        //handle return
        throw new Error('Email and password do not match ')

    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)



    // //set access token in cookie
    // res.send(verifyJwt(accessToken).payload)
    const signedUser = {
        user,
        accessToken,
        refreshToken
    }

    if (signedUser) {

        return signedUser
    } else {
        throw Error('signing in failed')



    }

}
module.exports = {

    registerUser,
    logInUser,

}