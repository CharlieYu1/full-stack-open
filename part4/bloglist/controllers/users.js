const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/user')

usersRouter.get('', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('', async (request, response, next) => {
  try {

    const { username, password, name } = request.body

    if (password.length < 3) {
      throw new mongoose.Error.ValidationError({
        'name': 'ValidationError',
        'message': 'Password is shorter than minimum allowed length (3)'
      })
    }

    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).end()
    next(error)
  }
})

module.exports = usersRouter