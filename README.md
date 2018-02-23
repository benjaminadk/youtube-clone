## You Tube Clone 

### Instructions
- `git clone https://github.com/benjaminadk/youtube-clone.git`
- `cd youtube-clone`
- `npm install`
- `cd client`
- `npm install`
- create `client/config/dev.js`
- add your personal keys

### A Full Stack React App Tutorial Series

#### Video 1 - Intro
- initialize project and install express, babel, etc

#### Video 2 - Graphql Basics
- endpoints, graphql, graphiql, schema, resolvers

#### Video 3 - Graphiql
- setup graphiql GUI

#### Video 4 - Mlab
- setup mlab and mongoose

#### Video 5 - User model
- basic user model

#### Video 6 - Passport 
- finish models install passport

#### Video 7 - Passport 2
- create a google app

#### Video 8 - Passport 3
- test it out and summary of google oauth20

#### Video 9 - Saving a User
- mongoose basics

#### Video 10 - Refactor Schema
- align with mongoose values
- install concurrently and create react app

#### Video 11 - Material UI
- install latest material ui and apollo 

#### Video 12 - React Router
- basic setup 

#### Video 13 - Apollo Frontend Test
- first apollo react component

#### Video 14 - Bug Fixes
- cors, typos, npm packages

#### Video 15 - Navigation
- material ui appbar and drawer

#### Video 16 - Navigation Icons
- link to upload, classes

#### Video 17 - Upload Component
- component style and layout
- use resource upload background

#### Video 18 Video Model
- create video model on backend

#### Video 19 Json Web Token
- create a json web token on login

#### Video 20 Json Web Token 2
- fetching jwt on frontend

#### Video 21 Json Web Token 3
- finalize jwt fetching

#### Video 22 Json Web Token 4
- transfer jwt to backend
- add user to context

#### Video 23 Video Upload
- bucket config
- aws sdk

#### Video 24 Video Upload 2
- send the video to aws
- axios

#### Video 25 Save Video
- video details and save to database

#### Video 26 Play Video 
- finally play a video on the frontend

#### Video 27 Video Details
- views, likes, dislikes, user and video info added to view

#### Video 28 Video Views
- find and update a videos views when the video loads

#### Video 29 Video Likes
- thumbs up and thumbs down
- complete implementation model, schema, resolvers, mutations, refetchQueries

#### Video 30 Video Share
- modal/dialog for sharing to social media
- react-share package

#### Video 31 Video Share 2
- more explanations and implementation

#### Video 32 Video Share 3
- setup embed option and time query param
- use momentjs and query-string

#### Video 33 Video Poster
- total refactor of Upload component
- add dropzone for poster
- show poster in Video component

#### Video 34 Comment 
- refactor Video main div into two sub components
- adjust height of certain components

#### Video 35 Comment 2
- comment model, schema, resolvers setup
- use of mongoose.populate
- expand our big query for video to include comments

#### Video 36 Comment 3
- slow explanation of client code around comments

#### Video 37 Sub Comment
- remove comments from user model
- implement sub comments

#### Video 38 Sub Comment 2
- further explanation of sub comment mutation

#### Video 39 Firebase Notification
- see below for setup instructions

#### Video 40 Firebase Notification 2
- getToken
- backend admin 

#### Video 41 My Channel - Videos
- build the My Channel View
- install react-swipeable-views in client

#### Video 42 My Channel - About
- build the about tab
- install country-list package

#### Video 43 My Channel - Search
- implement simple search of videos

#### Video 44 Video List 1
- implement basic video list to right of player
- uses moment to check date and add NEW icon

#### Video 45 Play Pause Feature
- add onClick play/pause toggle to video component
- use react-transition-group to add animated icon

#### Video 46 Video List 2
- add ability to display video duration on thumbnail
- uses componentDidUpdate lifecycle method

#### Video 47 Video List 3
- set up menu basics
- more css crapola
- some additional explanation of Video 46 points

#### Video 48 Playlists 1
- models, schemas and resolvers for playlists
- overview of what it looks like in the app

#### Video 49 Playlists 2
- frontend code - state, menu, popovers, checkboxes
- using componentDidMount

#### Video 50 Playlists 3
- playlists tab - overlay method
- mutation for adding and removing videos from playlists

#### Video 51 Playlists 4
- allow user to create new playlist when uploading video
- refetchQueries and moving some reused queries to their own file

#### Resources

- ***Upload Background***
    - https://s3-us-west-1.amazonaws.com/youtube-clone-assets/upload-background.svg
- ***YTC Notification Logo***
    - https://s3-us-west-1.amazonaws.com/youtube-clone-assets/icon.png
- ***Sample AWS S3 Bucket Policy***
```
{
    "Version": "2012-10-17",
    "Id": "S3-Console-Auto-Gen-Policy-1501076877929",
    "Statement": [
        {
            "Sid": "S3PolicyStmt-DO-NOT-MODIFY-1501076877929",
            "Effect": "Allow",
            "Principal": {
                "Service": "s3.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::<your bucket name>/*",
            "Condition": {
                "StringEquals": {
                    "aws:SourceAccount": "056188042019",
                    "s3:x-amz-acl": "bucket-owner-full-control"
                },
                "ArnLike": {
                    "aws:SourceArn": "arn:aws:s3:::<your bucket name>"
                }
            }
        }
    ]
}
```
- ***Sample Bucket CORS Policy***
```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin><your website url></AllowedOrigin>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <MaxAgeSeconds>10000</MaxAgeSeconds>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>Authorization</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```
- ***Firebase Cloud Messaging***
- Frontend
    - `npm install -S firebase` in client directory
    - create `firebase-messaging-sw.js` in client/src/public
    - add `"gcm_sender_id": "103953800507"` to `manifest.json` - number is univeral
    - create `fire.js` with config information in client/src
    - import config into your root javascript file - webpack will bundle
    - ***Example fire.js***
        ```
        import firebase from 'firebase'
        
        const config = { 
          messagingSenderId: "<your sender id>"
        }
        
        export default firebase.initializeApp(config)
        ```
    
- Backend
    - `npm install -S firebase-admin` in root directory
    - firebase settings - Firebase Admin SDK - Generate New Private Key
    - create a file the configs admin
    - keeping privateKey hidden is important
    - ***Example firebase/index.js***
    ```
    import admin from 'firebase-admin'
    import keys from '../config/keys'
    
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: "<your project id>",
        clientEmail: "<your firebase email>",
        privateKey: keys.firebaseKey
      })
    })
    
    console.log('FIREBASE INITIALIZED')
    ```


#### Important Links
##### [Apollo 2.0](https://www.apollographql.com/)
##### [Express](https://expressjs.com/)
##### [Babel](https://babeljs.io/)
##### [Passport](http://www.passportjs.org/)
##### [Create React App](https://github.com/facebookincubator/create-react-app)
##### [Material UI 1.0](https://material-ui-next.com/)
##### [AWS Credentials Docs](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)
##### [AWS Javascript SDK Docs](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html)
##### [React Share](https://github.com/nygardk/react-share)
##### [Query String](https://github.com/sindresorhus/query-string)
##### [Moment js](https://momentjs.com/)
##### [Firebase](https://firebase.google.com/)
##### [React Swipeable Views](https://react-swipeable-views.com)