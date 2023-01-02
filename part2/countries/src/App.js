import React from 'react'
import { useState } from 'react'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])

  const [filter, setFilter] = useState('')

  const [country, setCountry] = useState()

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      {country ? <Country country={country}/> : <CountryResults countries={countries.filter(country => country.name.includes(filter))} setCountry={setCountry} />}
    </div>
  )
}

export default App
