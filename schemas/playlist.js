export default `
    
    type Playlist {
        id: ID!
        title: String
        description: String
        views: Int
        owner: User
        videos: [Video]
        createdOn: String
    }
    
    input PlaylistInput {
        title: String
        description: String
        firstVideo: ID
    }
    
    type Query {
        getUserPlaylists: [Playlist]
        getPlaylistById(playlistId: ID!): Playlist
    }
    
    type Mutation {
        createPlaylist(input: PlaylistInput!): Playlist
        addVideoToPlaylist(playlistId: ID!, videoId: ID!, add: Boolean!): Playlist
    }
`