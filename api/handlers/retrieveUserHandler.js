import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from '../logic/index.js'

import { errors } from 'com'
const { NotFoundError, ContentError, TokenError } = errors

// Export a middleware function that handles HTTP requests
export default (req, res) => {
    try {
        // Extracting the token from the Authorization header
        const token = req.headers.authorization.substring(7)

        // Verifying and decoding the token to extract userId
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        // Retrieving user data using business logich
        logic.retrieveUser(userId)
            // this line takes the user data retrieved by logic.retrieveUser(userId) and sends it to the client as a JSON response.
            .then(user => res.json(user))
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
        // Catching synchronous errors
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406

        else if (error instanceof JsonWebTokenError) {
            status = 401

            error = new TokenError(error.message)
        }
        // Send a response with the status code and a JSON object containing error details
        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}