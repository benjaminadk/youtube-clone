const admin = require('firebase-admin')
const keys = require('../config')

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'youtube-clone-186318',
    clientEmail:
      'firebase-adminsdk-053j0@youtube-clone-186318.iam.gserviceaccount.com',
    privateKey: keys.firebaseKey
  })
})

console.log('FIREBASE INITIALIZED')
