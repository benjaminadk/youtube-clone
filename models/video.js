import mongoose from 'mongoose'

const { Schema }  = mongoose

const videoSchema = new Schema({
    
    title: String,
    
    owner: Schema.Types.ObjectId,
    
    url: String,
    
    desciption: String,
    
    poster: String,
    
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('video', videoSchema)