export default {
    
    Query: {
        
        getUserById: async(root, { userId }, { models }) => await models.User.findById(userId),
        
        allUsers: async(root, args, { models }) => await models.User.find({})
    },
    
    Mutation: {
        
        getFcmToken: async (root, { fcmToken }, { models, user }) => {
            const currentUser = await models.User.findById(user.id)
            currentUser.fcmToken = fcmToken
            const savedUser = await currentUser.save()
            return savedUser
        }
        
    }
}