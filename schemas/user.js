export default `
    
    type User {
        id: ID!
        username: String!
        email: String!
        googleId: String
        imageUrl: String
        createdOn: String
        videos: [Video]
        jwt: String
        likes: [ID!]
        dislikes: [ID!]
        comments: [ID]
    }
    
    type Query {
        getUserById(userId: ID!): User
        allUsers: [User!]!
    }

`