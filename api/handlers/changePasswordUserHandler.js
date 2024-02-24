import jwt from 'jsonwebtoken'
import logic from '../logic/index.js'
import { errors } from 'com'

const { JsonWebTokenError } = jwt
const { NotFoundError, CredentialsError, ContentError, TokenError } = errors

export default (req, res) => {
    try {
        // Extracting the token from the Authorization header
        const token = req.headers.authorization.substring(7)

        // Verifying and decoding the token to extract userId
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        const { password, newPassword, againNewPassword } = req.body

        logic.changePasswordUser(userId, password, newPassword, againNewPassword)
            .then(() => res.status(200).send())
            // Handle errors thrown by changePasswordUser
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError) {
                    status = 404
                }

                if (error instanceof CredentialsError) {
                    status = 401
                }

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