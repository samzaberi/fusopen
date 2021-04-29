

import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phonenumber: '071892873'
    },
    {
      name: 'john walker',
      phonenumber: '071899973'
    },
    {
      name: 'mark mark',
      phonenumber: '071891173'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  const addPerson = () => {
    const personObject = {
      name: newName,
      phonenumber: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

  }

  const checkSubmission = (event) => {
    event.preventDefault()
    persons.forEach(person => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`)
      } else {
        addPerson()
      }

    })
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const personsToShow = searchName.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input value={searchName} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <form onSubmit={checkSubmission}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {personsToShow.map(person => <p key={person.name}>{person.name} {person.phonenumber}</p>)}

    </div>
  )
}


export default App;
