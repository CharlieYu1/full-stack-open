const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers.map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

test('users are returned as json', async () => {
  await api.get('/api/users').expect(200).expect(
    'Content-Type', /application\/json/
  )
})