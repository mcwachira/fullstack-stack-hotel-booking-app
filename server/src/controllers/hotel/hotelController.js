const { query } = require("express")
const Hotel = require("../../models/Hotel")
const Room = require("../../models/Room")



//create hotel


const createHotel = async (req, res, next) => {

    try {
        const hotel = await Hotel.create(req.body)

        if (hotel) {
            res.status(201).json(hotel)
        } else {

            res.status(400).json({ message: 'hotel not created . invalid hotel data' })
        }

    } catch (error) {
        next(error)
    }

}


//get all hotels
const getAllHotels = async (req, res) => {

    const { min, max, ...others } = req.query

    try {

        //find the hotel 

        const hotel = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 },
        }).limit(req.query.limit)

        if (!hotel) {
            res.status(400).json({ message: 'No  Hotel exits' })
        }

        res.status(200).json(hotel)

    } catch (error) {
        res.status(500).json(error)
    }
}


//find hotel based on the city query
const countByCity = async (req, res) => {

    const cities = req.query.city.split(",")

    try {

        //find the hotel based city its located

        //since we are fetching multiple time promise.all() is used
        const list = await Promise.all(cities.map(city => {
            //return Hotel.find({ city: city }).length  this will take time and make the process slower as we are fetching the properties also
            return Hotel.countDocuments({ city: city })
        }))

        if (!list) {
            res.status(400).json({ message: 'No  Hotel exits' })
        }

        res.status(200).json(list)

    } catch (error) {
        res.status(500).json(error)
    }
}




//find hotel based on the type of hotel
const countByType = async (req, res) => {



    try {

        const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
        const apartmentCount = await Hotel.countDocuments({ type: 'apartment' })

        const resortCount = await Hotel.countDocuments({ type: 'resort' })

        const villaCount = await Hotel.countDocuments({ type: 'villa' })

        const cabinCount = await Hotel.countDocuments({ type: 'cabin' })

        res.status(200).json([

            { type: 'hotel ', count: hotelCount },
            { type: 'apartment', count: apartmentCount },
            { type: 'resort', count: resortCount },
            { type: 'villa ', count: villaCount },
            { type: 'cabin', count: cabinCount },



        ])

    } catch (error) {
        res.status(500).json(error)
    }
}



//find hotel rooms 

const findHotelRooms = async (req, res) => {


    try {
        const { id } = req.params

        const hotel = await Hotel.findById(id)
        const list = await Promise.all(hotel.rooms.map(room => {
            //return Hotel.find({ city: city }).length  this will take time and make the process slower as we are fetching the properties also
            return Room.findById(room)
        }))


        return res.status(200).json(list)

    } catch (error) {
        console.log(error)
    }

}


//find hotel based on the id


const findHotelById = async (req, res) => {

    const { id } = req.params
    try {

        //find the hotel based on the id

        const hotel = await Hotel.findById(id).exec()

        if (!hotel) {
            res.status(400).json({ message: 'No  Hotel with that id exist' })
        }

        res.status(200).json(hotel)

    } catch (error) {
        res.status(500).json(error)
    }
}

//update hotel


const updateHotel = async (req, res) => {

    const { id } = req.params
    try {

        //find the hotel based on the id

        const hotel = await Hotel.findById(id).exec()

        if (!hotel) {
            res.status(400).json({ message: 'No  Hotel with that id exist' })
        }


        const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json(updatedHotel)

    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteHotel = async (req, res) => {

    const { id } = req.params
    try {

        //find the hotel based on the id

        const hotel = await Hotel.findById(id).exec()

        if (!hotel) {
            res.status(400).json({ message: 'No  Hotel with that id exist' })
        }


        const deletedHotel = await Hotel.findByIdAndDelete(id)

        res.status(200).json({ message: 'hotel has been deleted' })

    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    createHotel, updateHotel, deleteHotel, getAllHotels,
    findHotelById, countByCity, countByType, findHotelRooms
}



