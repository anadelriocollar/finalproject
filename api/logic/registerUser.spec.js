import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import random from './helpers/random.js'

import registerUser from './registerUser.js'
import { errors } from 'com'
import { User } from '../data/models.js'

const { DuplicityError } = errors

describe('registerUser', () => {
    // Before hook to establish connection to the test MongoDB database
    before(async () => await mongoose.connect(process.env.TEST_MONGODB_URL))

    // Before each hook to clear the User collection before each test
    beforeEach(async () => await User.deleteMany())

    it('succeds on new user', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        // Register the user with the generated data
        await registerUser(name, email, password)

        // Find the registered user in the database
        const user = await User.findOne({ email })

        // Assertions to verify user existence and data integrity
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.email).to.equal(email)

        // Compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.password)
        expect(match).to.be.true
    })

    it('fails on already existing user', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        await User.create({ name, email, password })

        try {
            await registerUser(name, email, password)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal('user already exists')
        }
    })

    after(async () => await mongoose.disconnect())
})