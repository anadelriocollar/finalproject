import { validate, errors } from 'com'

import { User } from '../data/models.js'

const { SystemError, NotFoundError } = errors

function retrieveUser(userId) {
    validate.id(userId, 'user id')

    return (async () => {
        let user

        try {
            // We look up a user by their ID, fetching only the 'name' field, and convert the result to a plain object
            // In a MongoDB query using Mongoose, the .lean() method is used to return documents as plain JavaScript objects
            user = await User.findById(userId, 'name').lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('user not found')

        delete user._id

        return user
    })()
}

export default retrieveUser


