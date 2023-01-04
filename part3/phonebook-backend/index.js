require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const errorHandler = (error, req, res, next) => {
	console.log('Name of error: ', error.name)
	console.error(error.message)
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		console.log('Here', error.message)
		return res.status(400).send({ error: error.message })
	}

	next(error)
}

const Person = require('./models/persons')

morgan.token('body', req => {
	return JSON.stringify(req.body)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons/', (req, res, next) => {
	Person.find({}).then(persons => {
		res.json(persons)
	}).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id).then(person => {
		res.json(person)
	}).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id).then(() => {
		res.status(204).end()
	}).catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
	const person = req.body

	const newPerson = new Person({
		name: person.name,
		number: person.number
	})

	newPerson.save().then(savedPerson => {
		res.json(savedPerson)
	}).catch(error => {
		next(error)
	})
})

app.put('/api/persons/:id', (req, res, next) => {
	const { name, number }  = req.body



	Person.findByIdAndUpdate(req.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: 'query' }
	).then(updatedPerson => {
		res.json(updatedPerson)
	}).catch(error => next(error))

})

app.get('/info', (req, res) => {
	const date = new Date()
	Person.count({}).then(count => {
		res.write(`Phonebook has info for ${count} people\n`)
		res.write(date.toString())
		res.end()
	})

})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))