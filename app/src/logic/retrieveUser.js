import { validate, errors } from 'com'
import session from './session'
const { SystemError } = errors

export default function retrieveUser() {
    return (async () => {
        const req = {
            method: 'GET',
            headers: {
                // Setting Authorization header with the token from 'session'
                Authorization: `Bearer ${this.token}`
            }
        }

        let res

        // Enters the try when trying to make the HTTP request to the server to get the user's data
        try {
            res = await fetch(`${import.meta.env.VITE_API_URL}/users`, req)
        } catch (error) {
            throw new SystemError(error.message)
        }

        // Enters if if the status of the response is not OK. This occurs when the HTTP request response has a status code other than 200 (OK)
        if (!res.ok) {
            let body

            try {
                // Parsing response body as JSON
                body = await res.json()
            } catch (error) {
                throw new SystemError(error.message)
            }

            throw new errors[body.error](body.message)
        }

        // Enters when trying to parse the response body as JSON to get the user data
        try {
            // Parsing response body as JSON to obtain user data
            const user = await res.json()

            // Returning the user data
            return user
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}