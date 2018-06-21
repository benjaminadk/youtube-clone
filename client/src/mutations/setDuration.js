import gql from 'graphql-tag'

export const SET_DURATION_MUTATION = gql`
  mutation($videoId: ID!, $duration: Float!) {
    setDuration(videoId: $videoId, duration: $duration) {
      duration
    }
  }
`
