const Room = require('../../models/Room')
const Hotel = require('../../models/Hotel')



//create hotel


const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId
    try {
        const NewRoom = await Room.create(req.body)

        if (NewRoom) {
            try {
                await Hotel.findOneAndUpdate(hotelId, { $push: { rooms: NewRoom._id } })
                res.status(201).json(NewRoom)

            } catch (error) {
                next(error)
            }
            // res.status(201).json((NewRoom)

        } else {

            res.status(400).json({ message: 'room not created . invalid room data' })
        }

    } catch (error) {
        next(error)
    }

}


//get all rooms
const getAllRooms = async (req, res) => {


    try {

        //find the room based on the id

        const room = await Room.find()

        if (!room) {
            res.status(400).json({ message: 'No  Room exits' })
        }

        res.status(200).json(room)

    } catch (error) {
        res.status(500).json(error)
    }
}

//find room based on the id


const findRoomById = async (req, res) => {

    const { id } = req.params
    try {

        //find the room based on the id

        const room = await Room.findById(id).exec()

        if (!room) {
            res.status(400).json({ message: 'No  Room with that id exist' })
        }

        res.status(200).json(room)

    } catch (error) {
        res.status(500).json(error)
    }
}

//update room


const updateRoom = async (req, res) => {

    const { id } = req.params
    try {

        //find the room based on the id

        const room = await Room.findById(id).exec()

        if (!room) {
            res.status(400).json({ message: 'No  Room with that id exist' })
        }


        const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json(updatedRoom)

    } catch (error) {
        res.status(500).json(error)
    }
}


//update room based on booking of the room

const updateRoomAvailability = async (req, res) => {

    const { id } = req.params
    try {

        await Room.updateOne(
            {
                "roomsNumbers._id": id
            },
            {
                $push: {
                    "roomsNumbers.$.unavailableDates": req.body.dates

                },

            }
        )

        res.status(200).json('Room status has been updated')

    } catch (error) {
        res.status(500).json(error)
    }
}
const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelId


    const { id } = req.params
    try {

        //find the room based on the id

        const room = await Room.findById(id).exec()

        if (!room) {
            res.status(400).json({ message: 'No  Room with that id exist' })
        }


        const deletedRoom = await Room.findByIdAndDelete(id)
        try {
            await Hotel.findOneAndUpdate(hotelId, { $pull: { rooms: id } })


        } catch (error) {
            next(error)
        }

        res.status(200).json({ message: 'room has been deleted' })

    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    createRoom, updateRoom, deleteRoom, getAllRooms,
    findRoomById, updateRoomAvailability,
}



