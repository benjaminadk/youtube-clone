import gql from 'graphql-tag'

export const CREATE_PLAYLIST_MUTATION = gql`
  mutation($input: PlaylistInput!) {
    createPlaylist(input: $input) {
      id
      title
    }
  }
`
