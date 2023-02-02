const express = require('express')
const { getAllUsers,
    getUserById,
    updateUser,
    deleteUser } = require('../controllers/user/userController')
const { verifyUser, verifyToken, verifyIsAdmin } = require('../middleware/verifyToken')

const router = express.Router()


router.get('/users', verifyIsAdmin, getAllUsers)
router.get('/users/:userId', verifyUser, getUserById)
router.put('/update/:userId', verifyUser, updateUser)
router.delete('/delete/:userId', verifyUser, deleteUser)
module.exports = router