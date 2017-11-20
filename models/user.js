import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
    
    googleId: {
        type: String,
        unique: true
    },
    
    username: {
        type: String,
        unique: true
    },
    
    email: {
        type: String,
        unique: true
    },
    
    password: String,
    
    jwt: String,
    
    imageUrl: String,
    
    videos: {
        type: [Schema.Types.ObjectId],
        ref: 'video'
    },
    
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('user', userSchema)