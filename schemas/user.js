module.exports = `
    
    type User {
        id: ID!
        username: String!
        email: String!
        googleId: String
        imageUrl: String
        bannerUrl: String
        bannerPosition: String
        createdOn: String
        videos: [Video]
        playlists: [Playlist]
        jwt: String
        likes: [ID!]
        dislikes: [ID!]
        fcmToken: String
        about: String
        country: String
        links: [String]
    }
    
    type S3Banner {
        requestUrl: String
        bannerUrl: String
    }
    
    input AboutInput {
        about: String
        country: String
        links: String
    }

    type Payload {
        success: Boolean
        message: String
    }
    
    type Query {
        getUserById(userId: ID!): User
        currentUser(userId: ID): User
        allUsers: [User!]!
    }
    
    type Mutation {
        authenticate(token: String): Payload
        getFcmToken(fcmToken: String!): User
        s3SignBanner(filename: String!, filetype: String!): S3Banner
        addBanner(bannerUrl: String!): Payload
        addBannerPosition(bannerPosition: String!): Payload
        aboutTab(input: AboutInput): Payload
    }

`
