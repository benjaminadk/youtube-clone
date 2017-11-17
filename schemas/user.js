export default `
    
    type User {
        id: Int!
        username: String!
    }
    
    Query {
        getUser(userId: Int!): User
    }

`