import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [temperature, setTemperature] = useState('')
  const [imgIcon, setImgIcon] = useState('01d')
  const [wind, setWind] = useState('')
  
  const API_key = process.env.REACT_APP_API_KEY
  const lat = country.latlng[0]
  const lon = country.latlng[1] 
  
  useEffect(() => {  
    console.log('weather effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`)
      .then(response => {
          console.log('weather promise fulfilled')
          setTemperature(response.data.main.temp)
          setImgIcon(response.data.weather[0].icon)
          setWind(response.data.wind.speed)
      })
  }, [API_key, lat, lon])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.keys(country.languages).map((lang, i) => 
          <li key={i}>{country.languages[lang]}</li>
        )}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <h3>Weather in {country.capital}</h3>
      <p>temperature {temperature} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${imgIcon}@2x.png`} alt="weather icon" />
      <p>wind {wind} m/s</p>
    </div>
  )
}

export default Country