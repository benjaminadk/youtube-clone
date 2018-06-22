import gql from 'graphql-tag'

export const CREATE_EMPTY_PLAYLIST_MUTATION = gql`
  mutation($title: String!) {
    createEmptyPlaylist(title: $title) {
      id
    }
  }
`
