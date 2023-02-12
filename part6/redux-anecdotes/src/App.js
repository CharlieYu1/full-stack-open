import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anedcoteServices from './services/anecdote'
import { setAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anedcoteServices.getAll().then(
      anecdote => dispatch(setAnecdote(anecdote))
    )
  }, [dispatch])
  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />      
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App