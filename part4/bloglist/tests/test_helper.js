const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Unpopular post',
    author: 'Charlie',
    url: 'http://example.com',
    likes: -1,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com',
    likes: 12,
  },
  {
    title: 'another good post',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com',
    likes: 5,
  },
]

const newPost = {
  title: 'Another post',
  author: 'Charlie',
  url: 'http://example.com',
}


const newPostMissingUrl = {
  title: 'Another post',
  author: 'Charlie',
}


const newPostMissingTitle = {
  author: 'Charlie',
  url: 'http://example.com',
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, newPost, newPostMissingUrl, newPostMissingTitle, blogsInDb
}