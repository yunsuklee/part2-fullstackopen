import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
    }, [])
    
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(newSearch.toLowerCase())
  )
    
  return (
    <div>
      <Filter 
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App