export default `
    
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
        jwt: String
        likes: [ID!]
        dislikes: [ID!]
        fcmToken: String
    }
    
    type S3Banner {
        requestUrl: String
        bannerUrl: String
    }
    
    type Query {
        getUserById(userId: ID!): User
        currentUser: User
        allUsers: [User!]!
    }
    
    type Mutation {
        getFcmToken(fcmToken: String!): User
        s3SignBanner(filename: String!, filetype: String!): S3Banner
        addBanner(bannerUrl: String!): User
        addBannerPosition(bannerPosition: String!): User
    }

`