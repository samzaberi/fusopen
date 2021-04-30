import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = (props) => {

  return (
    <form onSubmit={props.handleAddClick}>
      <div>
        name: <input value={props.name} onChange={props.onNameChange} />
        <br />
          number: <input value={props.number} onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  const personsToShow = props.searchName.length === 0
    ? props.persons
    : props.persons.filter(person => person.name.toLowerCase().includes(props.searchName.toLowerCase()))

  return (
    <div>
      {personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with: <input value={props.searchName} onChange={props.onSearchChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    // console.log('effect')
    axios.get('http://localhost:3001/persons')
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const personExists = (obj) => obj.name === newName

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(personExists)) {
      console.log("personexists", personExists(personObject.name))
      alert(`${newName} is already added to phonebook`)
      return true
    }
    axios.post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response.data)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    return false

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} onSearchChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm handleAddClick={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons searchName={searchName} persons={persons} />

    </div>
  )
}


export default App;
