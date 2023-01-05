const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('', async (request, response) => {
  Blog.find({}).then(blogs => {
    blogs = blogs.map(blog => {
      return { id: blog._id.toString(), title: blog.title, author: blog.author, likes: blog.likes }
    })
    response.json(blogs)
  })
})

blogsRouter.get('/:id', async (request, response, next) => {
  Blog.findById(request.params.id).then(blog => {
    if (!blog) {
      response.send(400).end()
    } else {
      response.json(blog)
    }
  }).catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id).then(result => {
    if (result === null) {
      response.status(400).end()
    } else {
      response.status(204).end()
    }
  }).catch(error => next(error))
})

blogsRouter.post('', async (request, response, next) => {
  const blog = new Blog(request.body)
  blog.likes = blog.likes || 0
  if (!blog.title || !blog.url) {
    response.status(400)
  }
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (e) {
    next(e)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true, runValidators: true, context: 'query'
  }).then(blog => {
    if (!blog) {
      response.send(400).end()
    } else {
      response.json(blog)
    }
  }).catch(error => next(error))
})

module.exports = blogsRouter