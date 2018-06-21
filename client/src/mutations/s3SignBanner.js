import gql from 'graphql-tag'

export const S3_SIGN_BANNER_MUTATION = gql`
  mutation($filename: String!, $filetype: String!) {
    s3SignBanner(filename: $filename, filetype: $filetype) {
      requestUrl
      bannerUrl
    }
  }
`
