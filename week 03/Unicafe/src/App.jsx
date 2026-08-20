import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"

const App = () => {
  const [persons, setPersons] = useState([
  ])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
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
        id: Math.random() > 0.5,
      }

      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          console.log(`the response: ${response.data.name}`)

          setPersons(persons.concat({
            name: response.data.name,
            number: response.data.number,
            id: response.data.id
          }))
          setNewName('')
          setNewNumber('')
        })
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