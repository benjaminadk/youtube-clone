import gql from 'graphql-tag'

export const CREATE_VIDEO_MUTATION = gql`
  mutation($input: VideoInput) {
    createVideo(input: $input) {
      id
    }
  }
`
