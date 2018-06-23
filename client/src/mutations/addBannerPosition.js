import gql from 'graphql-tag'

export const ADD_BANNER_POSITION_MUTATION = gql`
  mutation($bannerPosition: String!) {
    addBannerPosition(bannerPosition: $bannerPosition) {
      success
      message
    }
  }
`
