import http from 'http'
import app from './app.js'
import * as dotenv from 'dotenv'
dotenv.config()

import connectDb from '../config/db.js'

const server = http.createServer(app)

const PORT = process.env.PORT || 8000;
app.set('port', PORT);

const startApp = async () => {
    await connectDb()

    console.log(`data base connected successfully`)

}
server.listen(PORT, (req, res) => {
    console.log(`server running on port ${PORT}`)
})

startApp()