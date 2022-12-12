import { useState } from 'react'

import Country from './Country'

const ShowableCountry = ({ country }) => {
  const [show, setShow] = useState(false)

  const handleClick = (event) => setShow(!show)

  if (show) {
    return (
      <div>
        <Country country={country} />
        <button onClick={handleClick}>show</button>  
      </div>
    )
  } else {
    return (
      <div>
        <span>{country.name.common}</span> 
        <button onClick={handleClick}>show</button>  
      </div>
    )
  }

  // <p key={i}>{country.name.common}</p>
}

export default ShowableCountry