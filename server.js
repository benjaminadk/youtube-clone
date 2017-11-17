import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

const server = express()
const PORT = 8081

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

server.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}`))