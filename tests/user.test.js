const app = require('../src/app')
const request = require('supertest')
const User = require('../src/models/user')

const userOne = {
    name: 'example',
    email: 'text@example.com',
    password: 'Abcd@1234'
}

beforeEach(async() => {
    await User.deleteMany();
    await new User(userOne).save();
})

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Yousef Nourizadeh',
        email: 'yousef@example.com',
        password: 'Abcd@1234',
        age: 23
    }).expect(201)
})

test('Should login the existing user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login noneexisted user', async() => {
    await request(app).post('/users/login').send({
        email: 'Yousef@baghbaghoo.com',
        password: 'Abcd@1234'
    }).expect(400)
})