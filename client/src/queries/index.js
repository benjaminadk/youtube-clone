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

export const USER_PLAYLIST_QUERY = gql`
    query {
        getUserPlaylists {
            id
            title
            createdOn
            videos {
                id
                poster
            }
        }
    }
`

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