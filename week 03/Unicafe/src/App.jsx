import { useState } from 'react'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '1234',
      id: 1
    },
    {
      name: 'Ada Lovelace',
      number: '123456',
      id: 2
    },
    {
      name: 'Dan Abramov',
      number: '12-43-234345', id: 3
    },
    {
      name: 'Mary Poppendieck',
      number: '39-23-6423122', id: 4
    }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filterText, setFilterText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const found = persons.find((p) =>
      p.name == newName)

    console.log(found)

    if (found) {
      window.alert(`${found.name} is already in the phonebook`)
    }
    else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} setFilterText={setFilterText} />

      <h2>Add a new number</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText} />

    </div>
  )
}

export default App