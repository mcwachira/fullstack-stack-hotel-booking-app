import mongoose from 'mongoose'
import colors from 'colors'


const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            name: 'Full stack hotel Booking Application',
        })

        console.log(`MongoDb  connected ${connect.connection.host}`.blue.underline)
    } catch (error) {
        console.log(`error :${error.message}`.red.underline.bold)
        process.exit(1)
    }


}


export default connectDb