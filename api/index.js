// Import the dotenv library, which is used to load environment variables from a .env file
import dotenv from 'dotenv'
dotenv.config()

// Import the mongoose library, which is used to interact with the MongoDB database
import mongoose from 'mongoose'
// Import the express library, which is used to create the web server and handle HTTP requests
import express from 'express'
// Import the cors library, which is used to configure CORS headers and allow requests from any origin
import cors from 'cors'

import {
    registerUserHandler
} from './handlers/index.js'

// Connect to the MongoDB database using the URL provided in the MONGODB_URL environment variable
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        // Create an instance of express to handle GET requests and return the message "Hello, World!"
        const server = express()
        server.get('/', (req, res) => res.send('Hello, World!'))

        // Middleware: Convert JSON request bodies to JavaScript objects and assign them to the request body property
        const jsonBodyParser = express.json()

        // Middleware: Configure CORS headers to allow access from any origin (*)
        server.use(cors())

        // Handle the user registration request with the /users route using the registerUserHandler controller
        server.post('/users', jsonBodyParser, registerUserHandler)

        server.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))

    })
    .catch(error => console.error(error))