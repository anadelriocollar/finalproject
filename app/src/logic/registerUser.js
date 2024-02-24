import { validate, errors } from 'com'
const { SystemError } = errors

export default function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email)
    validate.password(password)

    return (async () => {
        const req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        }

        let res

        try {
            // Perform the HTTP request to the server to register the user
            res = await fetch(`${import.meta.env.VITE_API_URL}/users`, req)
        } catch (error) {
            throw new SystemError(error.message)
        }
        // If the response is not successful (status code !== 200)
        if (!res.ok) {
            let body

            try {
                // If there is an error parsing JSON body, throw a 'SystemError' with the error message
                body = await res.json()
            } catch (error) {
                throw new SystemError(error.message)
            }

            throw new errors[body.error](body.message)
        }
    })()
}