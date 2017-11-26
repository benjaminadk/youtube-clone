import aws from 'aws-sdk'

export default {
    
    Query: {
        
        getUserById: async(root, { userId }, { models }) => await models.User.findById(userId),
        
        currentUser: async(root, args, { models, user }) => {
            return models.User.findById(user.id)
                .populate({ path: 'videos', model: 'video' })
                .exec()
        },
        
        allUsers: async(root, args, { models }) => await models.User.find({})
    },
    
    Mutation: {
        
        getFcmToken: async (root, { fcmToken }, { models, user }) => {
            const currentUser = await models.User.findById(user.id)
            currentUser.fcmToken = fcmToken
            const savedUser = await currentUser.save()
            return savedUser
        },
        
        s3SignBanner: async (root, { filename, filetype }, context) => {
            const s3 = new aws.S3({
                signatureVersion: 'v4',
                region: 'us-west-1'
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
            const bannerUrl = `https://${s3Bucket}.s3.amazonaws.com/${filename}`
            return { requestUrl, bannerUrl }
        },
        
        addBanner: async (root, { bannerUrl }, { models, user }) => {
            const currentUser = await models.User.findById(user.id)
            currentUser.bannerUrl = bannerUrl
            await currentUser.save()
            return currentUser
        }
        
    }
}