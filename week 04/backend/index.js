const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {

  const peopleCount = persons.length
  const currTime = new Date()
  const str = `<p>The phonebook has currently ${peopleCount} people</p> <p>${currTime}</p>`

  response.send(str)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  const person = request.body
  person.id = String(maxId + 1)

  if (!person.name) {
    return response.status(400).json({
      error: "the name is missing"
    })
  }
  if (!person.number) {
    return response.status(400).json({
      error: "the number is missing"
    })
  }

  const alreadyExists = persons.find(p => p.name.toLowerCase() === person.name.toLowerCase())

  if (alreadyExists) {
    return response.status(400).json({
      error: "this person is already on the phone book"
    })
  }

  else {
    persons = persons.concat(person)
    return response.json(person)
  }


})





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})