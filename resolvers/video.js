import aws from 'aws-sdk'

export default {
    
    Mutation: {
        
        s3Sign: async (root, { filename, filetype }, context) => {
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
            const videoUrl = `https://${s3Bucket}.s3.amazonaws.com/${filename}`
            return { requestUrl, videoUrl }
        },
        
        createVideo: async (root, { input }, { models, user: { id } }) => {
            const { title, description, poster, url } = input
            const video = new models.Video({
                owner: id,
                title,
                description,
                poster,
                url
            })
            const savedVideo = await video.save()
            const filter = { _id: id }
            const update = { $push: { videos: savedVideo._id }}
            const options = { upsert: true }
            await models.User.findOneAndUpdate(filter, update, options)
            return savedVideo
        }
    }
}