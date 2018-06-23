import gql from 'graphql-tag'

export const ADD_BANNER_MUTATION = gql`
  mutation($bannerUrl: String!) {
    addBanner(bannerUrl: $bannerUrl) {
      success
      message
    }
  }
`
