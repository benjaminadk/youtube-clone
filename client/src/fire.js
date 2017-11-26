import firebase from 'firebase'

const config = { 
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: "clone-186318.firebaseapp.com",
  // databaseURL: "https://clone-186318.firebaseio.com",
  // projectId: "youtube-clone-186318",
  // storageBucket: "youtube-clone-186318.appspot.com",
  messagingSenderId: "578692223559"
}

export default firebase.initializeApp(config)

