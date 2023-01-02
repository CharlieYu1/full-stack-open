import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import CountryResults from './components/CountryResults'

const App = () => {
  const apikey = process.env.REACT_APP_API_KEY

  const [countries, setCountries] = useState([])

  const [weatherData, setWeatherData] = useState({})

  const [filter, setFilter] = useState('')

  const [country, setCountry] = useState()

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setCountry()
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    if (country && !(country.name.common in weatherData)) { 
      const [lat, lon] = country.capitalInfo.latlng;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`).then(response => {
        console.log('Fetching data for ' + country.name.common)
        setWeatherData({...weatherData, [country.name.common]: response.data})
      })
    }
  }, [country])
  
  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <CountryResults countries={countries.filter(country => country.name.common.toLowerCase().includes(filter))} country={country} setCountry={setCountry} weatherData={weatherData} />
    </div>
  )
}

export default App
