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
    }
  }
})

const { setBlogs, appendBlog } = blogsSlice.actions

export const initializeBlogs = () => {

  return async dispatch => {
    console.log('initializeBlogs called')
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

export default blogsSlice.reducer
