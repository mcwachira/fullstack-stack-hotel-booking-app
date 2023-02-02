const userServices = require('../../services/user.service')
//updateUser

const updateUser = async (req, res, next) => {
    const userId = req.params.userId


    const { username, password, email } = req.body

    if (!username || !email) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    const updatedUser = {
        userId,
        username,
        email,
        password,

    }

    try {
        const user = await userServices.updateUser(updatedUser)
        res.status(200).json(user)
    } catch (error) {
        // return next(new AppError(`error${error}`), 401)
        throw Error(error)
        return next()
    }
}


//delete user
const deleteUser = async (req, res, next) => {
    const userId = req.params.userId
    try {
        const deletedUser = await userServices.deleteUser(userId)
        res.status(200).json({ message: 'user deleted successfully' })
    } catch (error) {
        // return next(new AppError(`error${error}`), 401)
        throw Error(error)
        return next()
    }
}


//get list of users 
const getAllUsers = async (req, res) => {

    try {
        const query = req.query.new
        const allUsers = await userServices.getAllUsers(query)
        res.status(200).json(allUsers)
    } catch (error) {
        // return next(new AppError('users not found'), 404)
        throw Error(error)
        return next()
    }
}


const getUserById = async (req, res, next) => {

    const userId = req.params.userId
    try {
        const user = await userServices.getUserById(userId)
        res.status(200).json(user)
    } catch (error) {
        // return next(new AppError('user with that id does not exist'), 404)
        throw Error('user with that id does not exist')
        return next()
    }
}



module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser

}