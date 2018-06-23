import gql from 'graphql-tag'

export const LIKE_ADDED_SUB = gql`
  subscription likeAdded($videoId: ID) {
    likeAdded(videoId: $videoId) {
      title
      description
      url
      poster
      createdOn
      views
      likes
      dislikes
      duration
      owner {
        id
        username
        imageUrl
        likes
        dislikes
      }
      comments {
        id
        text
        reply
        likes
        dislikes
        postedOn
        postedBy {
          username
          imageUrl
        }
        subComments {
          text
          likes
          dislikes
          postedOn
          postedBy {
            username
            imageUrl
          }
        }
      }
    }
  }
`
