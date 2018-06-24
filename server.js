const express = require('express')
const bodyParser = require('body-parser')
const sslRedirect = require('heroku-ssl-redirect')
const compression = require('compression')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
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

const subscriptionsEndpoint =
  process.env.NODE_ENV === 'production'
    ? `wss://fake-youtube.herokuapp.com/subscriptions`
    : `ws://localhost:${PORT}/subscriptions`

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint
  })
)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'))
  })
}

const ws = createServer(server)
ws.listen(PORT, () => {
  console.log(`APOLLO SERVER UP`)
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: ws,
      path: '/subscriptions'
    }
  )
})

//server.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}`))
