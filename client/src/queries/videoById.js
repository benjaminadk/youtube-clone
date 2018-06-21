import gql from 'graphql-tag'

export const VIDEO_BY_ID_QUERY = gql`
  query($videoId: ID!) {
    getVideoById(videoId: $videoId) {
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
