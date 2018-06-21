const mongoose = require('mongoose')

const { Schema } = mongoose

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
  }
})

mongoose.model('playlist', playlistSchema)
