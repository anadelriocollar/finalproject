import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

import changePasswordUser from './changePasswordUser.js'
import random from './helpers/random.js'
import { errors } from 'com'
const { CredentialsError, NotFoundError } = errors
import { User } from '../data/models.js'

dotenv.config()
// We are deconstructing the Types object that is imported from mongoose
// In mongoose, Types is an object that contains different types of data, and ObjectId is one of those types
const { ObjectId } = Types

describe('changePasswordUser', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => User.deleteMany())

    /// Positive test that verifies successful user password change
    it('succeeds with change user password', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        // Generate a new random password and set the password confirmation
        const newPassword = random.password()
        const againNewPassword = newPassword

        // Generate a hash of the password using bcrypt
        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name, email, password: hash })
        const value = await changePasswordUser(user.id, password, newPassword, againNewPassword)

        // Verify that the function returns undefined (success)
        expect(value).to.be.undefined

        // Verify that the password has been updated correctly
        const match = await bcrypt.compare(password, user.password)

        expect(match).to.be.true
    })

    // Negative test that verifies it fails when the user is not found
    it('fails on user not found', async () => {
        const password = random.password()
        const newPassword = random.password()

        try {
            // Attempt to change password with a non-existent user ID
            // This creates a new ObjectId object using the ObjectId constructor provided by mongoose. ObjectId is a data type commonly used in MongoDB databases
            /// The toString() method converts this ObjectId to a string
            await changePasswordUser(new ObjectId().toString(), password, newPassword, newPassword)

            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    // Negative test that verifies it fails when an incorrect password is provided
    it('fails on wrong password', async () => {
        const wrongPassword = random.password()
        const newPassword = random.password()

        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })

        try {
            await changePasswordUser(user.id, wrongPassword, newPassword, newPassword)

            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong credentials')
        }
    })

    // Negative test that verifies it fails when new passwords do not match
    it('fails between new password and confirmation', async () => {
        const password = random.password()
        const newPassword = random.password()
        const wrongPassword = random.password()

        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({ name: random.name(), email: random.email(), password: hash })

        try {
            await changePasswordUser(user.id, password, newPassword, wrongPassword)

            throw new Error('should not reach this point!')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong credentials with new password')
        }
    })

    after(() => mongoose.disconnect())
})