import { useState } from 'react'
import Select from 'react-select'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const SET_BIRTHYEAR = gql`
mutation setBirthYear($name: String!, $setBornTo: Int!) {
  editAuthor (
    name: $name,
    setBornTo: $setBornTo,
  ) {
    name
  }
}
`

const Authors = (props) => {

  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')

  const [editBirthYear] = useMutation(SET_BIRTHYEAR)

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })


  const submit = async (event) => {
    event.preventDefault()

    editBirthYear({ variables: { name, setBornTo: parseInt(birthYear) }})
    setName('')
    setBirthYear(0)
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }  

  const authors = result.data.allAuthors
  const options = authors.map(a => { return { value: a.name, label: a.name }})

  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption)
    setName(selectedOption.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>name</div>
        <Select 
          value={selectedOption}
          onChange={handleSelect}
          options={options}
        />
        <div>born</div>
        <input 
          type="number"
          value={birthYear}
          onChange={({ target }) => setBirthYear(target.value)}
        />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
