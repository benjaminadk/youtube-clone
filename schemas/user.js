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
        aboutTab(input: AboutInput): User
    }

`