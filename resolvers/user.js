const users = [
    {id: 1, username: 'bob'},{id: 2, username: 'jill'}
    ]

export default {
    
    Query: {
        
        getUser: (root, args, context) => users.find(u => u.id === args.userId)
    }
}