import { validate, errors } from 'com'
import session from './session'
const { SystemError } = errors


export default function loginUser(email, password) {
    validate.email(email)
    validate.password(password)

    return (async () => {
        const req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Converting email and password to JSON string and setting as request body
            body: JSON.stringify({ email, password })
        }

        let res

        try {
            // Sending a POST request to the authentication endpoint
            res = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, req)
        } catch (error) {
            throw new SystemError(error.message)
        }

        // Checking if the response status is not OK
        if (!res.ok) {
            let body

            try {
                // Handling JSON parsing errors by throwing a 'SystemError' with the error message
                body = await res.json()
            } catch (error) {
                throw new SystemError(error.message)
            }

            throw new errors[body.error](body.message)
        }

        try {
            // Parsing response body as JSON to extract the token
            const token = await res.json()

            // Extracting the payload part of the token
            const payloadB64 = token.slice(token.indexOf('.') + 1, token.lastIndexOf('.'))
            // Decoding the payload from base64 a JSON
            const payloadJson = atob(payloadB64)
            // Parsing the payload JSON string
            const payload = JSON.parse(payloadJson)
            // Extracting the user ID from the payload
            const userId = payload.sub

            // Setting the session user ID and token
            this.sessionUserId = userId
            this.token = token
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}