import Country from './Country'
import ShowableCountry from './ShowableCountry'

const compare = (a, b) => {
  if (a.name.common < b.name.common) return -1
  if (a.name.common > b.name.common) return 1
  return 0
}

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length > 1) {
    return (
      countries.sort(compare).map((country, i) => 
        <ShowableCountry key={i} country={country} />  
      ) 
    )
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else {
    return
  }
}

export default Countries