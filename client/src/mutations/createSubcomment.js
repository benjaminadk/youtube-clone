import gql from 'graphql-tag'

export const CREATE_SUBCOMMENT_MUTATION = gql`
  mutation($text: String!, $reply: Boolean!, $commentId: ID!) {
    createSubComment(text: $text, reply: $reply, commentId: $commentId) {
      id
    }
  }
`
