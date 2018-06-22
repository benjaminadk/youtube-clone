import firebase from 'firebase/app'
import 'firebase/messaging'

const config = {
  messagingSenderId: '578692223559'
}

export default firebase.initializeApp(config)
