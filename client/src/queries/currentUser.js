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
    }
  }
`
