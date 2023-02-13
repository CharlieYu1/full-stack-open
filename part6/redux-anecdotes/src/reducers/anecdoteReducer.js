import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'
import { timedNotification } from '../reducers/notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote).sort((a, b) => a.votes < b.votes ? 1 : -1)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload.sort((a, b) => a.votes < b.votes ? 1 : -1)
    }
  }
})

const { voteAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch(appendAnecdote(newAnecdote))
    dispatch(timedNotification(`You created '${content}'`, 5))
  }
}

export const vote = id => {
  return async dispatch => {
    const content = await anecdoteService.vote(id)
    dispatch(voteAnecdote(id))
    dispatch(timedNotification(`You voted '${content}'`, 5))
  }
}

export default anecdoteSlice.reducer