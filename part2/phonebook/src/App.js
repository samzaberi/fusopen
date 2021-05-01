import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import "./App.css"


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

const Notification = ({ message, classn }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={classn}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState('')
  const [classn, setClassn] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personExists = (obj) => obj.name === newName

  const addPerson = (event) => {
    event.preventDefault()

    const objArr = persons.filter(person => person.name === newName)
    const obj = objArr[0]
    if (persons.some(personExists) && obj.number !== newNumber) {
      updatePerson(obj)
      return 0
    }

    if (persons.some(personExists)) {
      alert(`${newName} is already added to phonebook`)
      return 1
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
        setMessage(`Added ${newName}`)
        setClassn("success")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    return 2

  }

  const updatePerson = (obj) => {
    window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)
    const updatedPerson = {
      name: newName,
      number: newNumber
    }
    personsService.update(obj.id, updatedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id !== obj.id ? p : response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const delPerson = (id) => {
    personsService.deletePerson(id)
      .then(() => {
        console.log("person deleted")
        personsService.getAll()
          .then(response => {
            setPersons(response.data)
          }).catch(error => {
            setMessage(`information of ${id} has already been removed from server`)
            setClassn("error")
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
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
      <Notification message={message} classn={classn} />
      <Filter searchName={searchName} onSearchChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm handleAddClick={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons searchName={searchName}
        persons={persons}
        callDelete={delPerson}
      />

    </div>
  )
}


export default App;
