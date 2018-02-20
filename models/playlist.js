import mongoose from 'mongoose'

const { Schema }  = mongoose

const playlistSchema = new Schema({
    
    title: String,
    
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    
    description: String,
    
    views: {
        type: Number,
        default: 0
    },
    
    videos: {
        type: [Schema.Types.ObjectId],
        ref: 'video'
    },
    
    createdOn: {
        type: Date,
        default: Date.now()
    },
    
})

export default mongoose.model('playlist', playlistSchema)