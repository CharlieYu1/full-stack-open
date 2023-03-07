import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setSuccessMessage, setErrorMessage } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const allBlogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  console.log(allBlogs)

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

  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      //const createdBlog = await blogService.create(BlogToAdd)
      dispatch(setSuccessMessage(`Blog ${BlogToAdd.title} was successfully added`))
      //setAllBlogs(allBlogs.concat(createdBlog))
      dispatch(setErrorMessage(null))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
    } catch (exception) {
      dispatch(setErrorMessage(`Cannot add blog ${BlogToAdd.title}`))
      dispatch(setSuccessMessage(null))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      //const updatedBlog = await blogService.update(BlogToUpdate)
      dispatch(setSuccessMessage(`Blog ${BlogToUpdate.title} was successfully updated`))
      /*
      setAllBlogs(
        allBlogs.map((blog) =>
          blog.id !== BlogToUpdate.id ? blog : updatedBlog
        )
      )
      */
      dispatch(setErrorMessage(null))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
    } catch (exception) {
      dispatch(setErrorMessage(`Cannot update blog ${BlogToUpdate.title}`))
      dispatch(setSuccessMessage(null))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
    }
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        blogService.remove(BlogToDelete.id)
        dispatch(setSuccessMessage(
          `Blog ${BlogToDelete.title} was successfully deleted`
        ))
        //setAllBlogs(allBlogs.filter((blog) => blog.id !== BlogToDelete.id))
        dispatch(setErrorMessage(null))
        setTimeout(() => {
          dispatch(setSuccessMessage(null))
        }, 5000)
      }
    } catch (exception) {
      dispatch(setErrorMessage(`Cannot delete blog ${BlogToDelete.title}`))
      dispatch(setSuccessMessage(null))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout} type="submit">
              logout
            </button>
          </p>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {allBlogs && allBlogs.slice().sort(byLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
