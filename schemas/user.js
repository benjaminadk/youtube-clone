export default `
    
    type User {
        id: ID!
        username: String!
        email: String!
        googleId: String
        imageUrl: String
        createOn: String
        videos: [String]
    }
    
    type Query {
        getUser(userId: ID!): User
        allUsers: [User!]!
    }

`