const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const connectDb = require('../config/db')
const multer = require('multer')
require('dotenv').config()

//loggers
const logger = require('./loggers/logger')
const httpLOgger = require('./loggers/httpLogger')

//error handlers
const { logError, isOperationalError } = require('./Error/errorHandler')


//initialize express app
const app = express()

//create our port 
const PORT = process.env.PORT || 8001

//connect our database
connectDb()

// for parsing application/json
app.use(express.json({ limit: "30mb", extended: true }))
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }))


//enabling cors
app.use(cors())

//enables us to se logs in our terminal
app.use(morgan('tiny')) //used to log request from the frontend
//get cookies
app.use(cookieParser())

/*enabling express to locate static files
app.use(express.static('public')) */

//enabling express to locate static files using virtual path /
app.use('/', express.static(path.join(__dirname, '/public')))





//get my routes

const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const hotelRouter = require('./routes/hotelRoutes')
const roomRouter = require('./routes/roomRoutes')


app.use('/api/v1', userRouter)
app.use('/api/v1', authRouter)
app.use('/api/v1', hotelRouter)
app.use('/api/v1', roomRouter)



// //error middleware

// app.use((err, req, res, next) => {
//     const errorStatus = err.status || 500
//     const errorMessage = err.message || 'Something went wrong'
//     return res.status(errorStatus).json({
//         success: false,
//         status: errorStatus,
//         message: errorMessage,
//         stack: err.stack

//     })
// })


//if the Promise is rejected this will catch it
process.on('unhandledRejection', error => {
    throw error
})

process.on('uncaughtException', error => {
    logError(error)

    if (!isOperationalError(error)) {
        process.exit(1)
    }
})

app.use(httpLogger)

app.listen(PORT, (req, res) => {
    console.log(`app running on port ${PORT}`)
})
