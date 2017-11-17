const users = [
    {id: 1, username: 'bob'},{id: 2, username: 'jill'}, {id: 3, username: 'sally'}
    ]

export default {
    
    Query: {
        
        getUser: (root, { userId }, context) => users.find(u => u.id === userId),
        
        allUsers: (root, args, context) => users
    }
}