require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')



const Person = require('./models/persons')


let phonebook = [
	{ 
		"id": 1,
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{ 
		"id": 2,
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{ 
		"id": 3,
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": 4,
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
]

morgan.token('body', req => {
	return JSON.stringify(req.body)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons/', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
})

app.get('/api/persons/:id', (req, res) => {
	
	Person.findById(req.params.id).then(person => {
		res.json(person)
	}).catch(() => {
		res.status(404).end()
	})
})

app.delete('/api/persons/:id', (req, res) => {
	Person.findById(req.params.id).then(person => {
		person.delete()
		res.status(204).end()
	}).catch(() => {
		res.status(404).end()
	})
})

app.post('/api/persons/', (req, res) => {
	const person = req.body
	console.log(req.body)
	//check validity
	if (!person.name || !person.number) {
		res.status(400).send({ error: 'missing name or number' })
	} else {
		Person.find({name: person.name}).then(persons => {
			if (persons.length > 0) {
				if (!res.headersSent) {
					res.status(400).send({ error: 'name must be unique' })
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

app.get('/info', (req, res) => {
	const date = new Date();
	
	res.write(`Phonebook has info for ${phonebook.length} people\n`)
	res.write(date.toString())
	res.end()
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))