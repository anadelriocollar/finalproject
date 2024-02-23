import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import changeEmailUser from './changeEmailUser.js'


(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URL)

    try {
        await changeEmailUser('65d8d8942e3138ec06d3d19a', 'josefa123@gmail.com', 'josefa123@gmail.com', '123123123')
        console.log('user email changed')

    } catch (error) {

        console.log(error)
    }
})()