const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
  Blog.find({}).populate('user', { blogs: 0 }).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', async (request, response, next) => {
  Blog.findById(request.params.id).populate('user', { blogs: 0 }).then(blog => {
    if (!blog) {
      response.send(400).end()
    } else {
      response.json(blog)
    }
  }).catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!request.user || blog?.user?.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'only creator of the blog can delete' })
  }

  Blog.findByIdAndRemove(request.params.id).then(result => {
    if (result === null) {
      response.status(400).end()
    } else {
      response.status(204).end()
    }
  }).catch(error => next(error))
})

blogsRouter.post('', async (request, response, next) => {
  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    url: request.body.url,
    author: request.body.author,
    user: user._id
  })

  blog.likes = request.body.likes || 0
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(400).json(error)
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  if (!request.user || blog?.user?.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'only creator of the blog can update' })
  }

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

blogsRouter.post('/:id/likes', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  if (!request.user) {
    return response.status(401).json({ error: 'You need to login to like a post' })
  }

  Blog.findByIdAndUpdate(request.params.id, {
    likes: blog.likes + 1
  }, {
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