import admin from 'firebase-admin'
import keys from '../config/keys'

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "youtube-clone-186318",
    clientEmail: "firebase-adminsdk-053j0@youtube-clone-186318.iam.gserviceaccount.com",
    privateKey: keys.firebaseKey
  })
})

console.log('FIREBASE INITIALIZED')

