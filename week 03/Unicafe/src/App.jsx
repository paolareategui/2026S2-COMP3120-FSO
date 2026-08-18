import { useState } from 'react'

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
    { name: 'Dan Abramov',
      number: '12-43-234345', id: 3
    },
    { name: 'Mary Poppendieck',
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

  const personsToDisplay = persons.filter(p => p.name.includes(filterText))

  return (
    <div>
      <h2>Phonebook</h2>

      <div>filter shown with <input value={filterText} onChange={(e) => setFilterText(e.target.value)}></input></div>


      <h2>Add a new number</h2>

      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {personsToDisplay.map((n) => (
        <p key={n.name}>{n.name} {n.number}</p>
      ))}
    </div>
  )
}

export default App