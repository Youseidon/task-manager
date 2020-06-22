const app = require('../src/app')
const request = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'yousef nourizadeh',
        email: 'nou.yousef@outlook.com',
        password: 'Abcd@1234',
        age: 23
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            age: 23,
            name: 'yousef nourizadeh',
            email: 'nou.yousef@outlook.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Abcd@1234')
})

test('Should login the existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOne._id);
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login noneexisted user', async() => {
    await request(app).post('/users/login').send({
        email: 'Yousef@baghbaghoo.com',
        password: 'Abcd@1234'
    }).expect(400)
})

test('Shouldl get profile from the logged in user', async() => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async() => {
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for authenticated user', async() => {
    const response = await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user).toBeNull()
})

test('Sould not delete account for unauthorized user', async() => {
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async() => {
    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('upload', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toStrictEqual(expect.any(Buffer))
})

test('Should update valid user fields', async() => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Abdollah jahanpour',
            age: 17
        })
        .expect(201)

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('abdollah jahanpour')
})

test('Should not update invalid user fields', async() => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'new york'
        })
        .expect(400)
})