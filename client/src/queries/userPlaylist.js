import gql from 'graphql-tag'

export const USER_PLAYLIST_QUERY = gql`
  query {
    getUserPlaylists {
      id
      title
      createdOn
      videos {
        id
        poster
      }
    }
  }
`
