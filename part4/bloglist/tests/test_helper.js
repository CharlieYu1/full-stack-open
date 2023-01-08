const Blog = require('../models/blog')
const User = require('../models/user')

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
    'username': 'user2',
    'password': 'pppqqq999888',
    'name': 'Peter Wong'
  },
  {
    'username': 'user3',
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

const newUser =   {
  'username': 'user4',
  'password': '!@#$%^&*()',
  'name': 'What Ever'
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  newBlog,
  newUser,
  newBlogMissingUrl,
  newBlogMissingTitle,
  blogsInDb,
  usersInDb,
  fakeId
}