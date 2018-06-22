const express = require('express')
const bodyParser = require('body-parser')
const sslRedirect = require('heroku-ssl-redirect')
const compression = require('compression')
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
const { checkAuthHeaders } = require('./middleware/checkAuthHeaders')
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
server.use(compression())
server.use(sslRedirect())
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

if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'))
  })
}

server.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}`))
