

import bcrypt from 'bcryptjs'

import { validate, errors } from 'com'

import { User } from '../data/models.js'

const { SystemError, DuplicityError } = errors

function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email, 'email')
    validate.text(password, 'password')

    return (async () => {
        // Declare a variable 'hash' to store the hashed password, and we want to use in both try/catches
        let hash

        try {
            // Attempt to hash the password using bcrypt with a cost factor of 8
            hash = await bcrypt.hash(password, 8)
        } catch (error) {
            throw new SystemError(error.message)
        }

        // Attempt to create a new user in the database using the 'User' model
        try {
            // here we do not wrap it in a constant, because it does not give us anything back
            await User.create({ name, email, password: hash })
        } catch (error) {
            // If the error code is 11000, it is interpreted as a duplicity error.
            // error code 11000 in MongoDB is a specific code indicating a single index violation.
            if (error.code === 11000)
                throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        }
    })()
}

export default registerUser