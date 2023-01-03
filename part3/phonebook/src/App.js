import React from 'react'
import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import phonebookService from './services/phonebook.js'

const App = () => {

  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    'font-size': '20px',
    'border-style': 'solid',
    'border-radius': '5px',
    'padding': '10px',
    'margin-bottom': '10px,'
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    'font-size': '20px',
    'border-style': 'solid',
    'border-radius': '5px',
    'padding': '10px',
    'margin-bottom': '10px,'
  }  

  const [messageStyle, setMessageStyle] = useState(successStyle)

  useEffect(() => {
    phonebookService.getAll().then(data =>
      setPersons(data)
    )
  }, [])
  
  const handleNewNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        var id = persons.filter(person => person.name === newName)[0].id;
        phonebookService.update(id, { name: newName, number: newNumber }).then(data => {
          setPersons(persons.map(person => person.id === id ? data : person))
          setMessage(`Information of ${newName} updated`)
          setMessageStyle(successStyle)
        }).catch(() => {
          setMessage(`Information of ${newName} can't be updated`)
          setMessageStyle(errorStyle)
        });
      }
    } else {
      phonebookService.create({ name: newName, number: newNumber }).then(data => {
        setPersons(persons.concat(data))
        setMessage(`Added ${newName}`)
        setMessageStyle(successStyle)
      }).catch(() => {
        setMessage(`Can't add ${newName}`)
        setMessageStyle(errorStyle)
      });
    }
  }

  const handleDelete = (id) => {
    var name = persons.filter(p => p.id === id)[0].name;
    phonebookService.del(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
      setMessage(`Deleted ${name}`)
      setMessageStyle(successStyle)
    }).catch(() => {
      setMessage(`Information of ${name} has already been removed from server`)
      setMessageStyle(errorStyle)
    })
  }

  return (
    <div>
      {message ? <Notification message={message} style={messageStyle}/> : null}
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <div>
        <Persons persons={persons.filter(person => person.name.includes(filter))} handleDelete={handleDelete}></Persons>
      </div>
    </div>
  )
}

export default App