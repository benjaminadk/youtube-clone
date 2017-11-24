import mongoose from 'mongoose'

const { Schema } = mongoose

const commentSchema = new Schema({
    
    text: String,
    
    reply: Boolean,
    
    likes: {
        type: Number,
        default: 0
    },
    
    dislikes: {
        type: Number,
        default: 0
    },
    
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    
    postedAbout: {
        type: Schema.Types.ObjectId,
        ref: 'video'
    },
    
    postedOn: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('comment', commentSchema)