export default {
    
    Query: {
        
        getUser: (root, { userId }, { models }) => models.User.findById(userId),
        
        allUsers: (root, args, { models }) => models.User.find({})
    }
}