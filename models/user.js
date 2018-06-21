const mongoose = require('mongoose')

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

  bannerUrl: String,

  bannerPosition: String,

  about: String,

  country: String,

  links: [String],

  videos: {
    type: [Schema.Types.ObjectId],
    ref: 'video'
  },

  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'video'
  },

  dislikes: {
    type: [Schema.Types.ObjectId],
    ref: 'video'
  },

  playlists: {
    type: [Schema.Types.ObjectId],
    ref: 'playlist'
  },

  subscriptions: {
    type: [Schema.Types.ObjectId],
    ref: 'user'
  },

  fcmToken: String,

  createdOn: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('user', userSchema)
