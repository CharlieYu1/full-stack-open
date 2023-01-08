const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const config = require('../utils/config')

let firstUserToken
let secondUserToken

beforeEach(async () => {
  await User.deleteMany({})
  const saltRounds = 12

  const firstUserObject = { 'username': 'charlie', 'password': 'abc123', 'name': 'charlie' }
  const firstPasswordHash = await bcrypt.hash(firstUserObject.password, saltRounds)
  const firstUser = new User({ ...firstUserObject, passwordHash: firstPasswordHash })
  await firstUser.save()
  const firstUserForToken = {
    username: firstUser.username,
    id: firstUser.id
  }
  firstUserToken = jwt.sign(firstUserForToken, config.SECRET)

  const secondUserObject = { 'username': 'charlie', 'password': 'abc123', 'name': 'charlie' }
  const secondPasswordHash = await bcrypt.hash(secondUserObject.password, saltRounds)
  const secondUser = new User({ ...secondUserObject, passwordHash: secondPasswordHash })
  await secondUser.save()
  const secondUserForToken = {
    username: secondUser.username,
    id: secondUser.id
  }
  secondUserToken = jwt.sign(secondUserForToken, config.SECRET)

  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: firstUser.id }))
  const userPromiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(userPromiseArray)
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs').expect(200).expect(
    'Content-Type', /application\/json/
  )
})

test('blogs have property id', async () => {
  await api.get('/api/blogs').then(result => {
    let blogs = result.body.map(blog => new Blog(blog))
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

test('create new post', async () => {
  await api.post('/api/blogs').send(helper.newBlog).set('Authorization', `bearer ${firstUserToken}`).expect(201).expect(
    'Content-Type', /application\/json/
  )
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('default zero likes', async () => {
  await api.post('/api/blogs').send(helper.newBlog).set('Authorization', `bearer ${firstUserToken}`).then(response => {
    const blog = new Blog(response.body)
    expect(blog.likes).toEqual(0)
  })
})

describe('request missing title or url ends in bad request', () => {

  test('of missing title', async () => {
    await api.post('/api/blogs').send(helper.newBlogMissingTitle).set('Authorization', `bearer ${firstUserToken}`).expect(400)
  })

  test('of missing url', async () => {
    await api.post('/api/blogs').send(helper.newBlogMissingUrl).set('Authorization', `bearer ${firstUserToken}`).expect(400)
  })
})

describe('put routes can update posts', () => {
  test('for the author', async () => {
    const newBlog = helper.newBlog

    const newBlogId = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${firstUserToken}`).then(async response => {
      return response.body.id
    })

    await api.put(`/api/blogs/${newBlogId}`)
      .send({ likes: 15 }).set('Authorization', `bearer ${firstUserToken}`).expect(200).then(async response => {
        expect(response.body.id).toBe(newBlogId)
        expect(response.body.title).toBe(newBlog.title)
        expect(response.body.author).toBe(newBlog.author)
        expect(response.body.url).toBe(newBlog.url)
        expect(response.body.likes).toBe(15)
      })
  })

  test('not for another user', async () => {
    const newBlog = helper.newBlog

    const newBlogId = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${firstUserToken}`).then(async response => {
      return response.body.id
    })

    await api.put(`/api/blogs/${newBlogId}`).send({ likes: 15 }).set('Authorization', `bearer ${secondUserToken}`).expect(401)
  })
})


describe('delete routes can delete posts', () => {
  test('for the author', async () => {
    const newBlog = helper.newBlog

    const newBlogId = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${firstUserToken}`).then(async response => {
      return response.body.id
    })

    await api.delete(`/api/blogs/${newBlogId}`).set('Authorization', `bearer ${firstUserToken}`).expect(204)
    await api.delete(`/api/blogs/${newBlogId}`).set('Authorization', `bearer ${firstUserToken}`).expect(401)
  })

  test('not for another user', async () => {
    const newBlog = helper.newBlog

    const newBlogId = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${firstUserToken}`).then(async response => {
      return response.body.id
    })

    await api.delete(`/api/blogs/${newBlogId}`).set('Authorization', `bearer ${secondUserToken}`).expect(401)
    await api.delete(`/api/blogs/${newBlogId}`).set('Authorization', `bearer ${secondUserToken}`).expect(401)
  })
})


test('put routes of nonexistant Id returns 401', async () => {
  await api.put(`/api/blogs/${helper.fakeId}`).send({ likes: 15 }).set('Authorization', `bearer ${firstUserToken}`).expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})