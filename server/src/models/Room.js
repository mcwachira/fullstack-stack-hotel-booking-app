const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({

    title: {
        type: String,
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    maxPeople: {
        type: Number,
        required: true
    },
    roomsNumbers: [{ number: Number, unavailableDates: [{ type: Date }] }],

}, {
    timestamps: true
})

module.exports = mongoose.model('Room', roomSchema)