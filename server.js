const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const passport = require('passport')
const {
  googleOauth,
  googleCallback,
  googleRedirect,
  googleScope
} = require('./passport')
const { makeExecutableSchema } = require('graphql-tools')
const {
  fileLoader,
  mergeResolvers,
  mergeTypes
} = require('merge-graphql-schemas')
const cors = require('cors')
const path = require('path')
require('./models/connect')
const models = require('./models')
const { checkAuthHeaders } = require('./middleware')
const keys = require('./config')
require('./firebase')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = express()
const PORT = keys.port
server.use(cors())
passport.use(googleOauth)
server.use(passport.initialize())
server.get('/auth/google', googleScope)
server.get('/auth/google/callback', googleCallback, googleRedirect)

server.use(checkAuthHeaders)

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user
    }
  }))
)

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
)

server.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}`))
