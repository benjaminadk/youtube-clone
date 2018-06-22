const jwt = require('jsonwebtoken')
const keys = require('../config')

const checkAuthHeaders = (req, res, next) => {
  const TOKEN = req.headers.authorization
  jwt.verify(TOKEN, keys.jwtSecret, (err, user) => {
    if (err) {
      console.log(err.message)
    }
    if (user) {
      req.user = user
    }
  })
  next()
}

module.exports = {
  checkAuthHeaders
}
