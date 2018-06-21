const mongoose = require('mongoose')

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
  },

  subComments: {
    type: [Schema.Types.ObjectId],
    ref: 'comment'
  }
})

mongoose.model('comment', commentSchema)
