import jwt from 'jsonwebtoken'
import logic from '../logic/index.js'
import { errors } from 'com'

const { JsonWebTokenError } = jwt
const { NotFoundError, CredentialsError, ContentError, TokenError } = errors

// Export a middleware function that handles HTTP requests
export default (req, res) => {
    try {
        // Extracting the token from the Authorization header
        const token = req.headers.authorization.substring(7)

        // Verifying and decoding the token to extract userId
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        // Destructure newEmail, againNewEmail, and password from the request body
        const { newEmail, againNewEmail, password } = req.body

        logic.changeEmailUser(userId, newEmail, againNewEmail, password)
            // Handle successful execution of changeEmailUser
            .then(() => res.status(200).send())
            // Handle errors thrown by changeEmailUser
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError) {
                    status = 404
                }

                if (error instanceof CredentialsError) {
                    status = 401
                }
                // Send an error response with the appropriate status code and error details
                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
        // Catching synchronous errors
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 406
        } else if (error instanceof JsonWebTokenError) {
            status = 401

            error = new TokenError(error.message)
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}