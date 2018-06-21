import gql from 'graphql-tag'

export const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      id
      username
      email
      imageUrl
      createdOn
    }
  }
`
