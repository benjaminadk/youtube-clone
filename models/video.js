import mongoose from 'mongoose'

const { Schema }  = mongoose

const videoSchema = new Schema({
    
    title: String,
    
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    
    url: String,
    
    description: String,
    
    poster: String,
    
    views: {
        type: Number,
        default: 0
    },
    
    likes: {
        type: Number,
        default: 0
    },
    
    dislikes: {
        type: Number,
        default: 0
    },
    
    createdOn: {
        type: Date,
        default: Date.now()
    },
    
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'comment'
    },
    
    fcmToken: {
        type: String,
        default: ''
    },
    
    duration: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('video', videoSchema)