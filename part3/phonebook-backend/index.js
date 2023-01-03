require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const errorHandler = (error, req, res, next) => {
	console.error(error.message)
	if (error.name === 'CastError') {
		return res.status(400).send({error: 'malformatted id'})
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
app.use(errorHandler)

app.get('/api/persons/', (req, res, next) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id).then(person => {
		res.json(person)
	}).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id).then(result => {
		res.status(204).end()
	}).catch(error => next(error))
})

app.post('/api/persons/', (req, res) => {
	const person = req.body
	console.log(req.body)
	//check validity
	if (!person.name || !person.number) {
		res.status(404).send({ error: 'missing name or number' })
	} else {
		Person.find({name: person.name}).then(persons => {
			if (persons.length > 0) {
				if (!res.headersSent) {
					res.status(404).send({ error: 'name must be unique' })
					return
				}
			}
		}).then(() => {
			if (!res.headersSent) {
				const newPerson = new Person({
					name: person.name,
					number: person.number
				})
				
				newPerson.save().then(savedPerson => {
					res.json(savedPerson)
				})
			}
		})
	}
})

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body
	const updatedPerson = {
		name: body.name,
		number: body.number
	}
	
	if (!updatedPerson.name || !updatedPerson.number) {
		res.status(404).send({ error: 'missing name or number' })
	} else {
		Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true })
		.then(updatedPerson => {
			res.json(updatedPerson)
		}).catch(error => next(error))
	}
})

app.get('/info', (req, res) => {
	const date = new Date();
	Person.count({}).then(count => {
		res.write(`Phonebook has info for ${count} people\n`)
		res.write(date.toString())
		res.end()
	})
	
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))