const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.0xlkica.mongodb.net/?retryWrites=true&w=majority`

const personsSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personsSchema)

if (process.argv.length === 5) {
  const newName = process.argv[3];
  const newNumber = process.argv[4];
  mongoose.connect(url).then(result => {
    const person = new Person({
      name: newName,
      number: newNumber
    })
    
    return person.save()
  }).then(() => {
    console.log(`added ${newName} ${newNumber} to phonebook`)
    mongoose.connection.close()
  }).catch(err => console.log(err))
} else {
  mongoose.connect(url).then(result => {
    Person.find({}).then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  }).catch(err => console.log(err))
}