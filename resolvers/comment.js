export default {
    
    Mutation: {
        
        createComment: async (root, { text, reply, videoId }, { models, user }) => {
            const comment = new models.Comment({
                text,
                reply,
                postedBy: user.id,
                postedAbout: videoId
            })
            const savedComment = await comment.save()
            const filter = { _id: videoId }
            const update = { $push: { comments: savedComment._id }}
            const options = { upsert: true }
            await models.Video.findOneAndUpdate(filter, update, options)
            return savedComment
        },
        
        createSubComment: async (root, { text, reply, commentId }, { models, user }) => {
            const comment = new models.Comment({
                text,
                reply,
                postedBy: user.id
            })
            const savedComment = await comment.save()
            const filter = { _id: commentId }
            const update = { $push: { subComments: savedComment._id }}
            const options = { upsert: true }
            await models.Comment.findOneAndUpdate(filter, update, options)
            return savedComment
        }
    }
}