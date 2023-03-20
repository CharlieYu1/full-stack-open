import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import BlogView from './components/BlogView'
import User from './components/User'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogsReducer'
import { setSuccessMessage, setErrorMessage } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const padding = {
    padding: 5
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(setErrorMessage('Wrong credentials'))
      dispatch(setSuccessMessage(null))
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (

    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link style={padding} to='/'>home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
            {user && (<p style={padding}>
              {user.name} logged in
              <Button variant="secondary" onClick={handleLogout} size="sm" type="submit">
                logout
              </Button>
            </p>)}
          </Nav>
        </Navbar.Collapse>
      </Navbar>



      <h2>Blogs App</h2>
      <Notification />
      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        />
      )}

      <Routes>
        <Route path="/" element={user && <Home />} />
        <Route path="/users" element={user && <Users />} />
        <Route path="/users/:id" element={user && <User />} />
        <Route path="/blogs/:id" element={user && <BlogView />} />
      </Routes>
    </div>


  )
}

export default App
