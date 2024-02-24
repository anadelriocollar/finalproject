import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import retrieveUser from './retrieveUser.js'
import { User } from '../data/models.js'
import { errors } from 'com'

const { NotFoundError } = errors

const { ObjectId } = mongoose.Types

describe('retrieveUser', () => {
    // Before hook to establish connection to the test MongoDB database
    before(async () => await mongoose.connect(process.env.TEST_MONGODB_URL))

    // Before each hook to clear the User collection before each test
    beforeEach(async () => await User.deleteMany())

    it('succeed on existing user', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const newUser = await User.create({ name, email, password })

        const user = await retrieveUser(newUser.id)

        expect(user.name).to.be.a('string')  // Assertions The user's name should be a string
        expect(user.name).to.equal(name)  // Assertions
        expect(user.id).to.be.undefined  // Assertions The user's ID should not be defined in the response
        expect(user.email).to.be.undefined // The user's email should not be defined in the response
        expect(user.password).to.be.undefined // The user's password should not be defined in the response
    })

    it('fails on non-existing user', async () => {
        try {
            // Attempt to retrieve a user with a non-existing ID
            await retrieveUser(new ObjectId().toString())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    after(async () => await mongoose.disconnect())
})