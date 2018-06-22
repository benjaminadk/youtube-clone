import gql from 'graphql-tag'

export const AUTHENTICATE_MUTATION = gql`
  mutation($token: String) {
    authenticate(token: $token) {
      success
      message
    }
  }
`
