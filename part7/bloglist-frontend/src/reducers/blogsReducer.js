import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { setSuccessMessage, setErrorMessage } from './notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      return action.payload
    },
    appendBlog (state, action) {
      state.push(action.payload)
    },
    updateBlogAction (state, action) {
      const id = action.payload.id
      return state.map(blog => blog.id === id ? action.payload: blog)
    },
    deleteBlogAction (state, action) {
      const id = action.payload.id
      return state.filter(blog => blog.id !== id)
    },
  }
})

const { setBlogs, appendBlog, updateBlogAction, deleteBlogAction } = blogsSlice.actions

export const initializeBlogs = () => {

  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blogToAdd => {
  return async dispatch => {
    try {
      const createdBlog = await blogsService.create(blogToAdd)
      dispatch(appendBlog(createdBlog))
      dispatch(setSuccessMessage(`Blog ${blogToAdd.title} was successfully added`))
      dispatch(setErrorMessage(null))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
    } catch (exception) {
      dispatch(setErrorMessage(`Cannot add blog ${blogToAdd.title}`))
      dispatch(setSuccessMessage(null))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
      throw(exception)
    }

  }
}

export const updateBlog = blogToUpdate => {
  return async dispatch => {
    try {
      const updatedBlog = await blogsService.update(blogToUpdate)
      dispatch(setSuccessMessage(`Blog ${blogToUpdate.title} was successfully updated`))
      dispatch(updateBlogAction(updatedBlog))
      dispatch(setErrorMessage(null))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
    } catch (exception) {
      dispatch(setErrorMessage(`Cannot update blog ${blogToUpdate.title}`))
      dispatch(setSuccessMessage(null))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
    }
  }
}

export const deleteBlog = blogToDelete => {
  return async dispatch => {
    try {
      if (window.confirm(`Delete ${blogToDelete.title} ?`)) {
        await blogsService.remove(blogToDelete.id)
        dispatch(setSuccessMessage(
          `Blog ${blogToDelete.title} was successfully deleted`
        ))
        dispatch(deleteBlogAction(blogToDelete))
        dispatch(setErrorMessage(null))
        setTimeout(() => {
          dispatch(setSuccessMessage(null))
        }, 5000)
      }
    } catch (exception) {
      dispatch(setErrorMessage(`Cannot delete blog ${blogToDelete.title}`))
      dispatch(setSuccessMessage(null))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
    }
  }
}

export default blogsSlice.reducer
