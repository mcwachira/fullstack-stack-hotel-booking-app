const express = require('express')
const { verifyUser, verifyToken, verifyIsAdmin } = require('../middleware/verifyToken')
const { createHotel, updateHotel, deleteHotel, getAllHotels, findHotelById, countByCity, countByType, findHotelRooms } = require('../controllers/hotel/hotelController')

const router = express.Router()


router.post('/', verifyIsAdmin, createHotel)
router.get('/hotels', getAllHotels)
router.get('/find/:id', findHotelById)
router.put('/update/:id', verifyIsAdmin, updateHotel)
router.delete('/delete/:id', verifyIsAdmin, deleteHotel)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', findHotelRooms)
module.exports = router