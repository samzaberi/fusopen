import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

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
const Person = (props) => {
  const onDeleteClick = () => {
    if (window.confirm(`Delete ${props.name} ?`)) {
      props.handleDelete()
    }
  }
  return (
    <div>
      {props.name} {props.number} <button onClick={onDeleteClick}>delete</button>
    </div>
  )
}

const Persons = (props) => {
  const personsToShow = props.searchName.length === 0
    ? props.persons
    : props.persons.filter(person => person.name.toLowerCase().includes(props.searchName.toLowerCase()))

  return (
    <div>
      {personsToShow.map(person => {
        return (
          <Person key={person.id} name={person.name}
            number={person.number}
            handleDelete={() => props.callDelete(person.id)}
          />

        )
      }
      )}
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
    personsService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personExists = (obj) => obj.name === newName

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(personExists)) {
      alert(`${newName} is already added to phonebook`)
      return true
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    personsService.create(personObject)
      .then(response => {
        console.log(response.data)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    return false

  }

  const delPerson = (id) => {
    personsService.deletePerson(id)
      .then(() => {
        console.log("person deleted")
        personsService.getAll()
          .then(response => {
            setPersons(response.data)
          })
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
      <PersonForm handleAddClick={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons searchName={searchName}
        persons={persons}
        callDelete={delPerson}
      />

    </div>
  )
}


export default App;
