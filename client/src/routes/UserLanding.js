import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Auth } from '../utils'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import CloseIcon from 'material-ui-icons/Close'
import firebase from 'firebase'

class UserLanding extends Component {
    
    state = {
      fcmTokenSnackbar: false
    }
    
    handleFcmSnackbarClose = () => this.setState({ fcmTokenSnackbar: false })
    
    handleNotification = async () => {
      const messaging = firebase.messaging()
      try {
        await messaging.requestPermission()
        const currentToken = await messaging.getToken()
        await this.props.getFcmToken({
          variables: { fcmToken: currentToken }
        })
        await this.setState({ fcmTokenSnackbar: true })
      } catch(err) {
        console.log('An error occurred while retrieving token. ', err)
      }
    }
    
    render(){
        const { data: { loading, getUserById } } = this.props
        if(loading) return null
        const { username, imageUrl, jwt, fcmToken } = getUserById
        if(username) Auth.authenticate()
        window.localStorage.setItem('TOKEN', jwt)
        window.localStorage.setItem('AVATAR', imageUrl)
        return(
            <div>
                <h1>Hey {username}. Welcome to You Tube Clone</h1>
                <Button
                    raised
                    color='primary'
                    onClick={this.handleNotification}
                >
                    {fcmToken ? 'Refresh Token' : 'Enable Push Notifications'} 
                </Button>
                <br/>
                {fcmToken && <Typography>Web Push Notifications are enabled. You will receive messages when someone likes one of your videos</Typography> }

                <Snackbar
                  open={this.state.fcmTokenSnackbar}
                  onRequestClose={this.handleFcmSnackbarClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  autoHideDuration={8000}
                  message={<span>Current Notification Token Saved</span>}
                  action={<IconButton onClick={this.handleFcmSnackbarClose} color='inherit'><CloseIcon/></IconButton>}
                />
            </div>
            )
    }
}

const USER_BY_ID_QUERY = gql`
    query($userId: ID!){
        getUserById(userId: $userId){
            username
            imageUrl
            jwt
            fcmToken
        }
    }
`

const FCM_TOKEN_MUTATION = gql`
    mutation($fcmToken: String!) {
      getFcmToken(fcmToken: $fcmToken) {
        fcmToken
      }
    }
`

export default compose(
  graphql(USER_BY_ID_QUERY, { options: props => ({ variables: {userId: props.match.params.userId }})}),
  graphql(FCM_TOKEN_MUTATION, { name: 'getFcmToken' })
)(UserLanding)