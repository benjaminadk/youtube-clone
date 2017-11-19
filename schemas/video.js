export default `

    type Video {
        id: ID!
        owner: User
        title: String!
        description: String!
        poster: String
        createdOn: String
    }
    
    input VideoInput {
        title: String
        description: String
        poster: String,
        url: String
    }
    
    type S3Payload {
        requestUrl: String
        videoUrl: String
    }
    
    type Mutation {
        s3Sign(filename: String!, filetype: String!): S3Payload
        createVideo(input: VideoInput): Video
    }
`