import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import changePasswordUser from './changePasswordUser.js'


(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URL)

    try {
        await changePasswordUser('65d8d8942e3138ec06d3d19a', '123123123', '456456456', '456456456')
        console.log('user paswword changed')

    } catch (error) {

        console.log(error)
    }
})()