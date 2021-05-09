const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    try {
        await User.deleteMany()
    } catch (error) {
        console.error(error.message)
    }

})

test('invalid user name not added', async () => {
    const newUser = {
        "notes": [],
        "username": "pi",
        "name": "man big",
        "password": "toomuch"
    }

    await api.post('/api/users')
        .send(newUser)
        .expect(400)
})

test('invalid password not added', async () => {
    const newUser = {
        "notes": [],
        "username": "johncena",
        "name": "man big",
        "password": "to"
    }

    await api.post('/api/users')
        .send(newUser)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})