import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { graphql, compose } from 'react-apollo'
import { Auth } from '../utils'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import firebase from 'firebase'
import { USER_BY_ID_QUERY } from '../queries/userById'
import { FCM_TOKEN_MUTATION } from '../mutations/fcmToken'

const styles = theme => ({
  root: {
    marginTop: '5vh'
  }
})

class UserLanding extends Component {
  state = {
    fcmTokenSnackbar: false
  }

  componentDidMount() {
    localStorage.setItem('USER_ID', this.props.match.params.userId)
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
    } catch (err) {
      console.log('An error occurred while retrieving token. ', err)
    }
  }

  render() {
    const {
      data: { loading, getUserById },
      classes
    } = this.props
    if (loading) return null
    const { username, email, imageUrl, jwt, fcmToken } = getUserById
    if (username) Auth.authenticate()
    localStorage.setItem('TOKEN', jwt)
    localStorage.setItem('AVATAR', imageUrl)
    localStorage.setItem('USERNAME', username)
    localStorage.setItem('EMAIL', email)
    return (
      <div className={classes.root}>
        <Typography variant="title">
          Hey {username}. Welcome to You Tube Clone
        </Typography>
        <Button
          variant="raised"
          color="primary"
          onClick={this.handleNotification}
        >
          {fcmToken ? 'Refresh Token' : 'Enable Push Notifications'}
        </Button>
        <br />
        {fcmToken && (
          <Typography variant="body2">
            Web Push Notifications are enabled. You will receive messages when
            someone likes one of your videos
          </Typography>
        )}

        <Snackbar
          open={this.state.fcmTokenSnackbar}
          onRequestClose={this.handleFcmSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={8000}
          message={<span>Current Notification Token Saved</span>}
          action={
            <IconButton onClick={this.handleFcmSnackbarClose} color="inherit">
              <CloseIcon />
            </IconButton>
          }
        />
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  graphql(USER_BY_ID_QUERY, {
    options: props => ({ variables: { userId: props.match.params.userId } })
  }),
  graphql(FCM_TOKEN_MUTATION, { name: 'getFcmToken' })
)(UserLanding)
