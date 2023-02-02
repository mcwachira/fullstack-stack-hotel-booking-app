const express = require('express')
const router = express.Router()
const { verifyUser, verifyToken, verifyIsAdmin } = require('../middleware/verifyToken')

const { createRoom, updateRoom, deleteRoom, getAllRooms, updateRoomAvailability,
    findRoomById } = require('../controllers/room/roomController')


router.post('/:hotelId', verifyIsAdmin, createRoom)
router.get('/', getAllRooms)
router.get('/:id', findRoomById)
router.put('/:id', updateRoom)
router.put('/room/availability/:id', updateRoomAvailability)
router.delete('/:id/:hotelId', verifyIsAdmin, deleteRoom)


module.exports = router