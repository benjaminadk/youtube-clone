export default {
    
    Query: {
        
        getUser: async(root, { userId }, { models }) => await models.User.findById(userId),
        
        allUsers: async(root, args, { models }) => await models.User.find({})
    }
}