const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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
  await api.post('/api/blogs').send(helper.newPost).expect(201).expect(
    'Content-Type', /application\/json/
  )
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('default zero likes', async () => {
  await api.post('/api/blogs').send(helper.newPost).then(result => {
    const blog = new Blog(result.body)
    expect(blog.likes).toEqual(0)
  })
})

describe('request missing title or url ends in bad request', () => {

  test('of missing title', async () => {
    await api.post('/api/blogs').send(helper.newPostMissingTitle).expect(400)
  })

  test('of missing url', async () => {
    await api.post('/api/blogs').send(helper.newPostMissingUrl).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})