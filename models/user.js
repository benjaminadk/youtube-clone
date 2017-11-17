import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
    
    username: {
        type: String,
        unique: true
    },
    
    email: {
        type: String,
        unique: true
    },
    
    password: String,
    
    imageUrl: String,
    
    videos: [String],
    
    createOn: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('user', userSchema)