import gql from 'graphql-tag'

export const CREATE_COMMENT_MUTATION = gql`
  mutation($text: String!, $reply: Boolean!, $videoId: ID!) {
    createComment(text: $text, reply: $reply, videoId: $videoId) {
      id
    }
  }
`
