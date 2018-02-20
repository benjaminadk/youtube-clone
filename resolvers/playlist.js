export default {
    
    Query: {
        
        getUserPlaylists: async (root, args, { models, user }) => {
            return await models.Playlist.find({ owner: user.id })
                .populate({ path: 'videos', model: 'video', populate: { path: 'owner', model: 'user' }})
                .exec()
        },
        
        getPlaylistById: async (root, { playlistId }, { models }) => {
            return await models.Playlist.findById(playlistId)
                .populate([
                    { path: 'owner', model: 'user' },
                    { path: 'videos', model: 'video', populate: { path: 'owner', model: 'user' }}
                    ])
                .exec()
        }
    },
    
    Mutation: {
        
        createPlaylist: async (root, { input }, { models, user }) => {
            const { title, description, firstVideo } = input
            const playlist = new models.Playlist({
                title,
                description,
                owner: user.id,
                videos: [firstVideo]
            })
            const savedPlaylist = await playlist.save()
            const filter = { _id: user.id }
            const update = { $push: { playlists: savedPlaylist._id }}
            await models.User.findOneAndUpdate(filter, update)
            return savedPlaylist
        },
        
        addVideoToPlaylist: async (root, { playlistId, videoId, add }, { models }) => {
            const filter = { _id: playlistId }
            const update = add ? { $push: { videos: videoId }} : { $pull: { videos: videoId }}
            await models.Playlist.findOneAndUpdate(filter, update)
            return await models.Playlist.findById(playlistId)
        }
    }
}