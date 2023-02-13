import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async ( object ) => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async ( id ) => {
  console.log('voted id', id)
  const response = await axios.get(`${baseUrl}/${id}`)
  const currentVotes = response.data.votes
  await axios.patch(`${baseUrl}/${id}`, { votes: currentVotes + 1 })
  return response.data.content
}

export default { getAll, createNew, vote }