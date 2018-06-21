import gql from 'graphql-tag'

export const ADD_VIEW_MUTATION = gql`
  mutation($videoId: ID!) {
    addView(videoId: $videoId) {
      views
    }
  }
`
