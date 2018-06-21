import gql from 'graphql-tag'

export const FCM_TOKEN_MUTATION = gql`
  mutation($fcmToken: String!) {
    getFcmToken(fcmToken: $fcmToken) {
      fcmToken
    }
  }
`
