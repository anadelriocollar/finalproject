import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import random from './helpers/random.js'

import authenticateUser from './authenticateUser.js'
import { errors } from 'com'
import { User } from '../data/models.js'

const { NotFoundError, CredentialsError } = errors

describe('authenticateUser', () => {
    before(async () => await mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(async () => await User.deleteMany())

    it('succeeds on correct credentials', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        // This line generates a hash of the password using the bcrypt library
        const hash = await bcrypt.hash(password, 8)

        // This line creates a new user document in the database using the create method of the User model
        const user = await User.create({ name, email, password: hash })

        // This line calls the authenticateUser function with the email and password
        const userId = await authenticateUser(email, password)

        expect(userId).to.be.a('string')
        expect(userId).to.have.lengthOf(24)
        expect(userId).to.equal(user.id)
    })

    it('fails on wrong email', async () => {
        const email = random.email()
        const password = random.password()

        try {
            await authenticateUser(email, password)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on wrong password', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const user = await User.create({ name, email, password })

        try {
            await authenticateUser(email, password + '-wrong')

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('wrong password')
        }
    })

    after(async () => await mongoose.disconnect())
})