import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([
  ])

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filterText, setFilterText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const found = persons.find((p) =>
      p.name === newName)

    console.log(found)

    if (found) {
      window.alert(`${found.name} is already in the phonebook`)
    }
    else {

      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = (id) => {
    personService
    .deleteByID(id)
    .then(response => {
      console.log(response.data)
      setPersons(persons.filter(p => p.id !== response.data.id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} setFilterText={setFilterText} />

      <h2>Add a new number</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText} handleDelete={handleDelete} />

    </div>
  )
}

export default App