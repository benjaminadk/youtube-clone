import gql from 'graphql-tag'

export const ABOUT_TAB_MUTATION = gql`
  mutation($input: AboutInput) {
    aboutTab(input: $input) {
      about
    }
  }
`
