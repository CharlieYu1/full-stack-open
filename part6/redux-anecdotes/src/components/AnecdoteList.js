import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes && anecdotes.filter(anecdote => anecdote.content.toString().toLowerCase().includes(filter)).map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => {
            dispatch(vote(anecdote.id))
            dispatch(showNotification(`You voted '${anecdote.content}'`))
            setTimeout(() => {
              dispatch(hideNotification())
            }, 5000);
          }}
        />
      )}
    </div>
    )
  }
  
  export default AnecdoteList