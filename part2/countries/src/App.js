import React, { useEffect, useState } from "react";
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)

      })
  }, [])

  const handleSearchInput = (event) => {
    setSearchString(event.target.value)
  }

  const countriesToShow = searchString.length === 0
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(searchString.toLowerCase()))



  return (
    <div>
      find countries: <input value={searchString} onChange={handleSearchInput} />
      <br />
      {countriesToShow.map(country => <p key={country.name}>{country.name}</p>)}

    </div>
  )
}

export default App;
