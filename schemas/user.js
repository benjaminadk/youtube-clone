export default `
    
    type User {
        id: Int!
        username: String!
    }
    
    type Query {
        getUser(userId: Int!): User
        allUsers: [User!]!
    }

`