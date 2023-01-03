import React from 'react'

const PersonForm = ({ newName, handleNewNameChange, newNumber, handleNewNumberChange, handleSubmit }) => {
  return (
    <form>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
    </form>
  )
}

export default PersonForm