const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/user')

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    request.decodedToken = decodedToken
  } catch (error) {
    request.decodedToken = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = request.decodedToken

  if (!decodedToken || !decodedToken.id) {
    request.user = null
  }
  try {
    const user = await User.findById(decodedToken.id, { passwordHash: 0 })
    request.user = user
  } catch(error) {
    request.user = null
  }
  next()
}

module.exports = { tokenExtractor, userExtractor }