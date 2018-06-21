import gql from 'graphql-tag'

export const ADD_TO_PLAYLIST_MUTATION = gql`
  mutation($playlistId: ID!, $videoId: ID!, $add: Boolean!) {
    addVideoToPlaylist(playlistId: $playlistId, videoId: $videoId, add: $add) {
      title
    }
  }
`
