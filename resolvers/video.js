const aws = require('aws-sdk')
const admin = require('firebase-admin')
const keys = require('../config')
const { withFilter, PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

module.exports = {
  Query: {
    getVideoList: async (root, args, { models }) => {
      return await models.Video.find({})
        .populate({ path: 'owner', model: 'user' })
        .exec()
    },

    getVideoById: async (root, { videoId }, { models }) => {
      return await models.Video.findById(videoId)
        .populate([
          { path: 'owner', model: 'user' },
          {
            path: 'comments',
            model: 'comment',
            populate: [
              { path: 'postedBy', model: 'user' },
              {
                path: 'subComments',
                model: 'comment',
                populate: { path: 'postedBy', model: 'user' }
              }
            ]
          }
        ])
        .exec()
    }
  },

  Mutation: {
    s3Sign: async (root, { filename, filetype }, context) => {
      const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'us-west-1',
        accessKeyId: keys.accessKeyId,
        secretAccessKey: keys.secretAccessKey
      })
      const s3Bucket = 'ytc-tutorial'
      const s3Params = {
        Bucket: s3Bucket,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read'
      }
      const requestUrl = await s3.getSignedUrl('putObject', s3Params)
      const videoUrl = `https://${s3Bucket}.s3.amazonaws.com/${filename}`
      return { requestUrl, videoUrl }
    },

    s3SignPoster: async (root, { filename, filetype }, context) => {
      const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'us-west-1',
        accessKeyId: keys.accessKeyId,
        secretAccessKey: keys.secretAccessKey
      })
      const s3Bucket = 'ytc-tutorial'
      const s3Params = {
        Bucket: s3Bucket,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read'
      }
      const requestUrl = await s3.getSignedUrl('putObject', s3Params)
      const posterUrl = `https://${s3Bucket}.s3.amazonaws.com/${filename}`
      return { requestUrl, posterUrl }
    },

    createVideo: async (root, { input }, { models, user: { id, fcm } }) => {
      const { title, description, poster, url } = input
      const video = new models.Video({
        owner: id,
        title,
        description,
        poster,
        url,
        fcmToken: fcm
      })
      const savedVideo = await video.save()
      const filter = { _id: id }
      const update = { $push: { videos: savedVideo._id } }
      const options = { upsert: true }
      await models.User.findOneAndUpdate(filter, update, options)
      return savedVideo
    },

    addView: async (root, { videoId }, { models }) => {
      const filter = { _id: videoId }
      const update = { $inc: { views: 1 } }
      return await models.Video.findOneAndUpdate(filter, update)
    },

    addLike: async (root, { videoId, remove }, { models, user }) => {
      const filter_1 = { _id: user.id }
      const update_1 = remove
        ? { $pull: { likes: videoId } }
        : { $push: { likes: videoId } }
      const currentUser = await models.User.findOneAndUpdate(filter_1, update_1)
      const filter_2 = { _id: videoId }
      const update_2 = { $inc: { likes: remove ? -1 : 1 } }
      const currentVideo = await models.Video.findOneAndUpdate(
        filter_2,
        update_2
      )
      const video = await models.Video.findById(videoId)
        .populate([
          { path: 'owner', model: 'user' },
          {
            path: 'comments',
            model: 'comment',
            populate: [
              { path: 'postedBy', model: 'user' },
              {
                path: 'subComments',
                model: 'comment',
                populate: { path: 'postedBy', model: 'user' }
              }
            ]
          }
        ])
        .exec()
      if (!remove) {
        await pubsub.publish('likeAdded', { likeAdded: video })
        // const payload = {
        //   notification: {
        //     title: `${currentUser.username} Liked Your Video`,
        //     body: `"${currentVideo.title}" now has ${currentVideo.likes +
        //       1} likes`,
        //     clickAction: `http://localhost:3000/video/${videoId}`,
        //     icon:
        //       'https://s3-us-west-1.amazonaws.com/youtube-clone-assets/icon.png'
        //   },
        //   token: user.fcm
        // }
        // try {
        //   const response = await admin.messaging().send(payload)
        //   console.log('MESSAGE SENT', response)
        // } catch (error) {
        //   console.log(error)
        // }
      }
      return currentVideo
    },

    addDislike: async (root, { videoId, remove }, { models, user }) => {
      const filter_1 = { _id: user.id }
      const update_1 = remove
        ? { $pull: { dislikes: videoId } }
        : { $push: { dislikes: videoId } }
      await models.User.findOneAndUpdate(filter_1, update_1)
      const filter_2 = { _id: videoId }
      const update_2 = { $inc: { dislikes: remove ? -1 : 1 } }
      return await models.Video.findOneAndUpdate(filter_2, update_2)
    },

    setDuration: async (root, { videoId, duration }, { models }) => {
      const filter = { _id: videoId }
      const update = { duration: duration }
      return await models.Video.findOneAndUpdate(filter, update)
    }
  },

  Subscription: {
    likeAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('likeAdded'),
        (payload, { videoId }) => {
          return payload.likeAdded.id === videoId
        }
      )
    }
  }
}
