export default `

    type Comment {
        id: ID
        text: String
        reply: Boolean
        likes: Int
        dislikes: Int
        postedBy: User
        postedAbout: Video
        postedOn: String
    }
    
    type Mutation {
        createComment(text: String!, reply: Boolean!, videoId: ID!): Comment
    }
`