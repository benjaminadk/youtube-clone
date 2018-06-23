import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
  query($userId: ID) {
    currentUser(userId: $userId) {
      username
      email
      imageUrl
      createdOn
      bannerUrl
      bannerPosition
      about
      country
      links
      likes
      dislikes
      videos {
        id
        title
        url
        description
        createdOn
        poster
        views
        likes
      }
      playlists {
        id
        title
        description
        views
        createdOn
        videos {
          id
          poster
        }
      }
    }
  }
`
