const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('', async (request, response) => {
  Blog.find({}).then(blogs => {
    blogs = blogs.map(blog => {
      return {id: blog._id.toString(), title: blog.title, author: blog.author, likes: blog.likes}
    })
    response.json(blogs)
  })
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

module.exports = blogsRouter