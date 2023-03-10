import React from 'react'
import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import UserDetail from './components/UserDetail'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setMessage(`Welcome back, ${user.username}`)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setMessage(`You have logged in as ${user.username}`)
      blogService.setToken(user.token)
    } catch (exception) {
      console.log(exception)
      setMessage(`Error: ${exception.response.data.error}`)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken('')
    setMessage('You have logged out')
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLike = async (blog) => {
    const id = blog.id
    blogService.like(blog).then(returnedBlog => {
      setBlogs(blogs.map(blog => (
        blog.id === id ? returnedBlog : blog
      )))
    })
  }

  const handleDelete = async (blog) => {
    const id = blog.id
    blogService.deleteBlog(blog).then(() => {
      setBlogs(blogs.filter(blog => (
        blog.id !== id
      )))
    })
  }

  const createBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blog).then(returnedBlog => {
      console.log('returnedBlog', returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    }).catch(exception => setMessage(`Error: ${exception.response.data.error}`))
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [])

  const blogFormRef = useRef()

  return (
    <>
      <h2>blogs</h2>
      {message ? <Notification message={message} /> : null}
      {user ? <div>
        <UserDetail username={user.username} handleLogout={handleLogout} />
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <NewBlogForm
            createBlog={createBlog}
          />
        </Togglable>
        <br />
        <BlogList
          blogs={blogs}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      </div> : <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </Togglable>
      }
    </>
  )
}

export default App
