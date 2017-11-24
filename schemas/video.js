export default `

    type Video {
        id: ID!
        owner: User
        title: String!
        url: String!
        description: String!
        poster: String
        createdOn: String!
        views: Int
        likes: Int
        dislikes: Int
        comments: [Comment]
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
    
    type S3Poster {
        requestUrl: String
        posterUrl: String
    }
    
    type Query {
        getVideoById(videoId: ID!): Video
    }
    
    type Mutation {
        s3Sign(filename: String!, filetype: String!): S3Payload
        createVideo(input: VideoInput): Video
        addView(videoId: ID!): Video
        addLike(videoId: ID!, remove: Boolean!): Video
        addDislike(videoId: ID!, remove: Boolean!): Video
        s3SignPoster(filename: String!, filetype: String!): S3Poster
    }
`