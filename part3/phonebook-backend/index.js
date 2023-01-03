const express = require('express')
const morgan = require('morgan')

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.get('/api/persons/', (req, res) => {
    res.send(JSON.stringify(phonebook))
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = phonebook.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
    const person = req.body
    //check validity
    if (!person.name || !person.number) {
        res.status(400).json({ error: 'missing name or number' })
        return
    }

    if (phonebook.map(person => person.name).includes(person.name)) {
        res.status(400).json({ error: 'name must be unique' })
        return
    }
    
    let id = Math.floor(Math.random() * 100000000)
    let newPerson = {...person, id}
    phonebook.push(newPerson)
    res.json(person)
})

app.get('/info', (req, res) => {
    const date = new Date();

    res.write(`Phonebook has info for ${phonebook.length} people\n`)
    res.write(date.toString())
    res.end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))