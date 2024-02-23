import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, CredentialsError } = errors

function changePasswordUser(userId, password, newPassword, againNewPassword) {
    validate.id(userId, 'id')
    validate.password(password, 'password')
    validate.password(newPassword, 'new password')
    validate.password(againNewPassword, 'again password')

    // Find a user by their ID using the User model
    return User.findById(userId)
        // Catch any errors that occur during the user lookup
        .catch(error => { throw new SystemError(error.message) })
        // If the lookup is successful, continue with the found user
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            // Compare the provided password with the user's stored password
            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        throw new CredentialsError('wrong credentials')
                    }

                    if (newPassword !== againNewPassword) {
                        throw new CredentialsError('wrong credentials with new password')
                    }

                    // Hash the new password
                    return bcrypt.hash(newPassword, 8)
                        .then(hash => {
                            // Update the user's password with the hashed value
                            user.password = hash

                            // Save the changes to the user in the database
                            return user.save()
                                .catch(error => { throw new SystemError(error.message) })
                        })
                })
        })
}

export default changePasswordUser