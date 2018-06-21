require('./user')
require('./video')
require('./comment')
require('./playlist')
const mongoose = require('mongoose')
const User = mongoose.model('user')
const Video = mongoose.model('video')
const Comment = mongoose.model('comment')
const Playlist = mongoose.model('playlist')

module.exports = {
  User,
  Video,
  Comment,
  Playlist
}
