import gql from 'graphql-tag'

export const ADD_DISLIKE_MUTATION = gql`
  mutation($videoId: ID!, $remove: Boolean!) {
    addDislike(videoId: $videoId, remove: $remove) {
      dislikes
    }
  }
`
