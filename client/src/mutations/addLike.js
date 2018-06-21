import gql from 'graphql-tag'

export const ADD_LIKE_MUTATION = gql`
  mutation($videoId: ID!, $remove: Boolean!) {
    addLike(videoId: $videoId, remove: $remove) {
      likes
    }
  }
`
