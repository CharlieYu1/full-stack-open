import React from 'react'

const Country = ({ country, weatherData }) => {

  return (
    <div>
        <h1>{ country.name.common }</h1>
        <div>capital { country.capital }</div>
        <div>area { country.area }</div>
        <h2>languages:</h2>
        <ul>
            {Object.entries(country.languages).map(lang => <li key={lang[1]}>{lang[1]}</li> )}
        </ul>
        <img src={country.flags.png} alt={country.name.common} />

        {weatherData[country.name.common] ? 
            <div>
                <h2>Weather in {country.capital}</h2>
                <div>temperature {weatherData[country.name.common].main.temp} degrees</div>
								<img 
									src={`http://openweathermap.org/img/wn/${weatherData[country.name.common].weather[0].icon}@2x.png`} 
									alt={weatherData[country.name.common].weather[0].description} 
								/>
								<div>wind {weatherData[country.name.common].wind.speed} m/s</div>
            </div>
        : null}

    </div>
  )
}

export default Country