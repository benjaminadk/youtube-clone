export default {
    
    Mutation: {
        
        createComment: async (root, {text, reply, videoId }, { models, user }) => {
            const comment = new models.Comment({
                text,
                reply,
                postedBy: user.id,
                postedAbout: videoId
            })
            const savedComment = await comment.save()
            const filter_1 = { _id: videoId }
            const update = { $push: { comments: savedComment._id }}
            const options = { upsert: true }
            await models.Video.findOneAndUpdate(filter_1, update, options)
            const filter_2 = { _id: user.id }
            await models.User.findOneAndUpdate(filter_2, update, options)
            return savedComment
        }
    }
}