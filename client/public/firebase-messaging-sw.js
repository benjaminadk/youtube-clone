importScripts('/__/firebase/5.0.0/firebase-app.js')
importScripts('/__/firebase/5.0.0/firebase-messaging.js')
importScripts('/__/firebase/init.js')

var messaging = firebase.messaging()

firebase.initializeApp({
  messagingSenderId: '578692223559'
})

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  var notificationTitle = 'Background Message Title'
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
