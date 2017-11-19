import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink, concat } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from './theme'
import 'typeface-roboto'

const httpLink = new HttpLink({ uri: 'https://youtube-clone-benjaminadk.c9users.io:8081/graphql' })

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: window.localStorage.getItem('TOKEN') || null,
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
    </ApolloProvider>, root)
registerServiceWorker()
