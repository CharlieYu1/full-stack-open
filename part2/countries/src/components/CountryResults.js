import React from 'react'
import { useEffect } from 'react'
import Country from './Country'

const CountryResults = ({ countries, country, setCountry, weatherData }) => {
	useEffect(() => {
		if (countries.length === 1) {
			setCountry(countries[0])
		}
	}, [countries, setCountry])


	if (country) {
		return <Country country={country} weatherData={weatherData} />
	}
  if (countries.length > 10) {
    return <div>Too many matches, specific another filter</div>
  } else {
    return (
      <div>
				{countries.map(country => {
					return (
						<div key={country.name.common}>
							{country.name.common}
							<button onClick={() => setCountry(country)}>show</button>
						</div>
					)
				}
			)}
			</div>
    )
  }
}

export default CountryResults