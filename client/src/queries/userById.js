import gql from 'graphql-tag'

export const USER_BY_ID_QUERY = gql`
  query($userId: ID!) {
    getUserById(userId: $userId) {
      username
      email
      imageUrl
      jwt
      fcmToken
    }
  }
`
