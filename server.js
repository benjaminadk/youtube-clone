import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import passport from 'passport'
import { googleOauth, googleCallback, googleRedirect, googleScope } from './passport'
import { makeExecutableSchema } from 'graphql-tools'
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import cors from 'cors'
import path from 'path'
import models from './models'
import { checkAuthHeaders } from './middleware'
require('./models/connect')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const server = express()
const PORT = 8081
server.use('*', cors({ origin: 'https://youtube-clone-benjaminadk.c9users.io' }))
passport.use(googleOauth)
server.use(passport.initialize())
server.get('/auth/google', googleScope)
server.get('/auth/google/callback', googleCallback, googleRedirect)

server.use(checkAuthHeaders)

server.use('/graphql', bodyParser.json(), graphqlExpress(req => ({ 
    schema,
    context: {
        models,
        user: req.user
    }
})))

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))

server.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}`))