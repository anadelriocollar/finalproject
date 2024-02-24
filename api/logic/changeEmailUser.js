import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, CredentialsError } = errors

function changeEmailUser(userId, newEmail, againNewEmail, password) {
    validate.id(userId, 'user id')
    validate.email(newEmail, 'newEmail')
    validate.email(againNewEmail, 'newEmail')
    validate.password(password, 'password')

    return User.findById(userId)
        // Catch any errors that occur during the user lookup
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            if (newEmail !== againNewEmail) {
                throw new CredentialsError('new email and confirm are not the same')
            }

            // Compare the provided password with the user's stored password
            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        throw new CredentialsError('wrong credentials')
                    }
                    // If passwords match, update the user's email
                    user.email = newEmail

                    // Save the changes to the user in the database
                    user.save()
                        // Catch any errors that occur during saving the user
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}

export default changeEmailUser