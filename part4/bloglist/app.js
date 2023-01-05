const config = require('./utils/config')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



module.exports = app