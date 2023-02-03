import { createAction, createSlice } from '@reduxjs/toolkit'
const updateVote = createAction('anecdote/vote')

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateVote, (state, action) => {
      return `You voted ${action.payload.content}`
    })
  }

})

export default notificationSlice.reducer