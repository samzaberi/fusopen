import React, { useState } from 'react'

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
      {personsToShow.map(person => <p key={person.name}>{person.name} {person.phonenumber}</p>)}
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} onSearchChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm handleAddClick={checkSubmission}
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
