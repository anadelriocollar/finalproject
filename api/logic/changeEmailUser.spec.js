import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import dotenv from 'dotenv'

import changeEmailUser from './changeEmailUser.js'
import random from './helpers/random.js'
import { errors } from 'com'
const { CredentialsError, NotFoundError } = errors
import { User } from '../data/models.js'

dotenv.config()
const { ObjectId } = Types

describe('changeEmailUser', () => {

    // Before hook to establish connection to the test MongoDB database
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    // Before each hook to clear the User collection before each test
    beforeEach(() => User.deleteMany())

    // REVIEW: DOES NOT WORK
    it('succes change email user', async () => {
        const name = random.name()
        const newEmail = random.email()
        const password = random.password()

        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })
        // Call the changeEmailUser function with the created user's ID, new email, and password
        const value = await changeEmailUser(user.id, newEmail, newEmail, user.password)

        // Assert that the value returned by the function is undefined (indicating success)
        expect(value).to.be.undefined
    })


    // Test case for user not found
    it('fails on user not found', async () => {
        const newEmail = random.email()
        const password = random.password()

        try {
            // Call changeEmailUser function with a non-existing user ID, new email, and password
            await changeEmailUser(new ObjectId().toString(), newEmail, newEmail, password)
            throw new Error('should not reach this point!')

        } catch (error) {
            // Assert that the error is an instance of NotFoundError and has the correct message
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    // Test case for wrong password
    it('fails on wrong password', async () => {
        const newEmail = random.email()
        const otherPassword = random.password()

        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })

        try {
            await changeEmailUser(user.id, newEmail, newEmail, otherPassword)
            throw new Error('should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong credentials')
        }
    })

    // Test case for email mismatch between new email and confirmation
    it('fails between new email and confirmation', async () => {
        const newEmail = random.email()
        const otherEmail = random.email()

        const user = await User.create({ name: random.name(), email: random.email(), password: random.password() })

        try {
            await changeEmailUser(user.id, newEmail, otherEmail, user.password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('new email and confirm are not the same')
        }
    })

    after(() => mongoose.disconnect())
})