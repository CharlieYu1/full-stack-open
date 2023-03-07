import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      return action.payload
    }
  }
})

const { setBlogs } = blogsSlice.actions

export const initializeBlogs = () => {

  return async dispatch => {
    console.log('initializeBlogs called')
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogsSlice.reducer
