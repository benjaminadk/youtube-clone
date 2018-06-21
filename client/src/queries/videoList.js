import gql from 'graphql-tag'

export const VIDEO_LIST_QUERY = gql`
  query {
    getVideoList {
      id
      title
      description
      poster
      views
      createdOn
      duration
      owner {
        id
        username
      }
    }
  }
`
