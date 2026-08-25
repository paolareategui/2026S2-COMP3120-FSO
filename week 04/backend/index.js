const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
app.use(express.static('dist'))
require('dotenv').config()

const Person = require('./models/person')

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(p => {
    response.json(p)
  })
})

app.post('/api/persons/', (request, response) => {

  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: "the name is missing"
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: "the number is missing"
    })
  }

  Person.find({}).then(people => {
    const alreadyExists = people.some(p => p.name.toLowerCase() === body.name.toLowerCase())

    if (alreadyExists) {
      return response.status(400).json({
        error: "this person is already on the phone book"
      })
    }

    else {
      const person = new Person({
        name: body.name,
        number: body.number,
      })
      person.save().then(newPerson => {
        response.json(newPerson)
      })
    }
  })
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







const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})