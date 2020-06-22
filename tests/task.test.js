const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const { userOne, userTwo, taskOne, taskTwo, taskThree, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async() => {
    const response = await request(app).post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'from the test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
})

test('Should get tasks for user', async() => {
    const response = await request(app).get('/tasks').query({ limit: 3, skip: 0, sortBy: 'createdAt:asc' })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(302)
})

test('Shoud get task by id', async() => {
    const response = await request(app).get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(302)
})

test('Should update task by id', async() => {
    const response = await request(app).patch(`/tasks/${taskTwo._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'this is a test description after updating'
        })
        .expect(201)
})

test('Should delete task by id', async() => {
    const response = await request(app).delete(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
})