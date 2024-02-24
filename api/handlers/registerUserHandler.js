import logic from '../logic/index.js'
import { errors } from 'com'
const { ContentError, DuplicityError } = errors

// Export a middleware function that handles HTTP requests
export default (req, res) => {
    try {
        // Extract the 'name', 'email', and 'password' properties from the request body
        const { name, email, password } = req.body

        // Call the 'registerUser' function from the logic module, passing the user data
        logic.registerUser(name, email, password)
            // Handle the promise returned by 'registerUser' when it successfully completes
            .then(() => res.status(201).send())
            // Catch any errors that occur during the registration process
            .catch(error => {
                let status = 500

                if (error instanceof DuplicityError)
                    status = 409

                // Send a response with the status code and a JSON object containing error details
                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406

        // Send a response with the status code and a JSON object containing error details
        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}
