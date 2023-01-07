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

const initialUsers = [
  {
    'username': 'charlie',
    'password': 'abc123',
    'name': 'Charlie'
  },
  {
    'username': 'charlie',
    'password': 'pppqqq999888',
    'name': 'Peter Wong'
  },
  {
    'username': 'charlie',
    'password': '!@#$%^&*()',
    'name': 'Joey Chan'
  }
]

const newBlog = {
  title: 'Another blog',
  author: 'Charlie',
  url: 'http://example.com',
  likes: 0,
}


const newBlogMissingUrl = {
  title: 'Another post',
  author: 'Charlie',
}


const newBlogMissingTitle = {
  author: 'Charlie',
  url: 'http://example.com',
}

const fakeId = '0123456789abcdef01234567'

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  newBlog,
  newBlogMissingUrl,
  newBlogMissingTitle,
  blogsInDb,
  fakeId
}