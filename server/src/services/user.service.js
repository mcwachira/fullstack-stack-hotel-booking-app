const bcrypt = require('bcrypt');
const User = require('../models/User')


const getAllUsers = async (query) => {
    try {

        const users = query ? await User.find().sort({ _id: -1 }).limit(3) : await User.find()

        if (!users?.length) {
            throw Error('no users found ')
        } else {
            return users
        }

    } catch (error) {
        console.log(error)
    }

}

const getUserById = async (id) => {
    try {

        const user = await User.findById(id).select('-password')
        console.log(user)

        return user
    } catch (error) {
        console.log(error)
    }
}


const updateUser = async (updateUser) => {

    const { userId, email, password, username } = updateUser
    //check id the user exist
    const user = await User.findById(userId).exec()

    if (!user) {
        throw Error('No user with that id exits')
    }

    //check if username is in use
    const duplicateUser = await User.findOne({ username }).lean().exec()
    if (duplicateUser) {
        throw Error('username already in use')
    }

    //check if the password is present and if so update it
    let updatedPassword;

    if (password) {
        updatedPassword = await bcrypt.hash(password, 10)
    }

    //update the user details
    const updatedUserDetails = {
        username: username,
        password: updatedPassword,
        email: email
    }



    //will update the user and return  iut immediately via the new:true value
    const updatedUser = User.findByIdAndUpdate(userId, updatedUserDetails, { new: true })

    return updatedUser;

}

const deleteUser = async (userId) => {

    //check id the user exist
    const user = await User.findById(userId).exec()

    if (!user) {
        throw Error('No user with that id exits')
    }

    const deletedUser = await User.findByIdAndDelete(userId)

    return deletedUser
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}