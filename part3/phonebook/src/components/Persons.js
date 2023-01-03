import React from 'react'
import Person from './Person'

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>{persons.map(person => <Person person={person} key={person.name} handleDelete={handleDelete} />)}</div>
  )
}

export default Persons