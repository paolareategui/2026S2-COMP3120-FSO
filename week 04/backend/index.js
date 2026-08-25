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

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(p => {
      response.json(p)
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {

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

  Person.find({})
    .then(people => {
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
        person.save()
          .then(newPerson => {
            response.json(newPerson)
          })
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const number = request.body.number
  Person.findByIdAndUpdate(id, { number: number }, { new: true })
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(people => {
      const peopleCount = people.length
      console.log(peopleCount)
      const currTime = new Date()
      const str = `<p>The phonebook has currently ${peopleCount} people</p> <p>${currTime}</p>`

      response.send(str)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})