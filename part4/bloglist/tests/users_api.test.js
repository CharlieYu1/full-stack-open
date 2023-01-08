const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  const saltRounds = 12
  const initialUsers = helper.initialUsers
  await initialUsers.forEach(async user => {
    user.passwordHash = await bcrypt.hash(user.password, saltRounds)
  })
  const userObjects = initialUsers.map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

test('users are returned as json', async () => {
  await api.get('/api/users').expect(200).expect(
    'Content-Type', /application\/json/
  )
})

test('create new user', async () => {
  await api.post('/api/users').send(helper.newUser).expect(201).expect(
    'Content-Type', /application\/json/
  )
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)
})

test('users can login', async () => {
  const firstUser = ({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })
  await api.post('/api/login').send(firstUser).expect(200).expect(
    'Content-Type', /application\/json/
  ).then(response => {
    expect(response.body.token).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})