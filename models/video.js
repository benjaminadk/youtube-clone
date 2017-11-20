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
    
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('video', videoSchema)