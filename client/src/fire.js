import firebase from 'firebase/app'
import 'firebase/messaging'

const config = {
  // apiKey: 'AIzaSyBjHVB_vb_cn2rb_wYuHbnCm5U6yEj23YQ',
  // authDomain: "clone-186318.firebaseapp.com",
  // databaseURL: "https://clone-186318.firebaseio.com",
  // projectId: "youtube-clone-186318",
  // storageBucket: "youtube-clone-186318.appspot.com",
  messagingSenderId: '578692223559'
}

export default firebase.initializeApp(config)
