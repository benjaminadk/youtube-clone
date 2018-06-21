import React from 'react'
import ReactDOM from 'react-dom'
import App from './Root'
import registerServiceWorker from './registerServiceWorker'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink, concat } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'
import 'typeface-roboto'
import firebase from './fire'

const messaging = firebase.messaging()
messaging.onMessage(payload => console.log('MESSAGE RECEIVED ', payload))

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' })

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: window.localStorage.getItem('TOKEN') || null
    }
  }))
  return forward(operation)
})

const link = concat(authMiddleware, httpLink)
const cache = new InMemoryCache()
const client = new ApolloClient({
  link,
  cache
})

const root = document.getElementById('root')

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  root
)
registerServiceWorker()
