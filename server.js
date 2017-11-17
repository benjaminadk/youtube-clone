import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schemas/user'
import resolvers from './resolvers/user'
import models from './models'
require('./models/connect')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const server = express()
const PORT = 8081

server.use('/graphql', bodyParser.json(), graphqlExpress({ 
    schema,
    context: {
        models
    }
}))

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

server.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}`))