import gql from 'graphql-tag'

export const S3_SIGN_POSTER_MUTATION = gql`
  mutation($filename: String!, $filetype: String!) {
    s3SignPoster(filename: $filename, filetype: $filetype) {
      requestUrl
      posterUrl
    }
  }
`
