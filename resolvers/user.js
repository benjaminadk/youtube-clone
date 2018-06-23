const aws = require('aws-sdk')
const jwt = require('jsonwebtoken')
const keys = require('../config')

module.exports = {
  Query: {
    getUserById: async (root, { userId }, { models }) =>
      await models.User.findById(userId),

    currentUser: async (root, { userId }, { models, user }) => {
      const id = userId || user ? user.id : null
      if (!id) return null
      return models.User.findById(id)
        .populate([
          { path: 'videos', model: 'video' },
          {
            path: 'playlists',
            model: 'playlist',
            populate: [{ path: 'videos', model: 'video' }]
          }
        ])
        .exec()
    },

    allUsers: async (root, args, { models }) => await models.User.find({})
  },

  Mutation: {
    authenticate: async (root, { token }, { models }) => {
      try {
        const { username } = await jwt.verify(token, keys.jwtSecret)
        return {
          success: true,
          message: `🤖 Welcome Back.  ${username || ''}`
        }
      } catch (error) {
        return {
          success: false,
          message: `😡 Error: ${error.message}`
        }
      }
    },

    getFcmToken: async (root, { fcmToken }, { models, user }) => {
      const currentUser = await models.User.findById(user.id)
      currentUser.fcmToken = fcmToken
      const savedUser = await currentUser.save()
      return savedUser
    },

    s3SignBanner: async (root, { filename, filetype }, context) => {
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
      const bannerUrl = `https://s3-us-west-1.amazonaws.com/${s3Bucket}/${filename}`
      return { requestUrl, bannerUrl }
    },

    addBanner: async (root, { bannerUrl }, { models, user }) => {
      try {
        const currentUser = await models.User.findById(user.id)
        currentUser.bannerUrl = bannerUrl
        await currentUser.save()
        return {
          success: true,
          message: 'New Banner Image saved successfully.'
        }
      } catch (error) {
        return {
          success: false,
          message: 'Error saving Banner Image.'
        }
      }
    },

    addBannerPosition: async (root, { bannerPosition }, { models, user }) => {
      try {
        const currentUser = await models.User.findById(user.id)
        currentUser.bannerPosition = bannerPosition
        await currentUser.save()
        return {
          success: true,
          message: '🤖 Banner position set.'
        }
      } catch (error) {
        return {
          success: false,
          message: '😡 Error setting banner position.'
        }
      }
    },

    aboutTab: async (
      root,
      { input: { about, country, links } },
      { models, user }
    ) => {
      try {
        const currentUser = await models.User.findById(user.id)
        currentUser.about = about
        currentUser.country = country
        currentUser.links = links.split(',').map(l => l.trim())
        await currentUser.save()
        return {
          success: true,
          message: '🤖 About updated successfully.'
        }
      } catch (error) {
        return {
          success: false,
          message: '😡 Error updating About page.'
        }
      }
    }
  }
}
