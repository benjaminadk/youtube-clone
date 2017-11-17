import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from './theme'
import 'typeface-roboto'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://youtube-clone-benjaminadk.c9users.io:8081/graphql' }),
  cache: new InMemoryCache()
})

const root = document.getElementById('root')

ReactDOM.render(
    <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </ApolloProvider>, root)
registerServiceWorker()
