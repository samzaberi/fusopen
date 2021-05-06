import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import "./App.css"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import Notification from "./components/Notification"


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
