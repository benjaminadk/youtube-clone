import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { graphql, compose } from 'react-apollo'
import classNames from 'classnames'
import { PropsRoute, PrivateRoute, Auth } from './utils/routing'
import RootAppBar from './components/RootAppBar'
import Home from './containers/Home'
import Upload from './containers/Upload'
import UserLanding from './containers/UserLanding'
import Video from './containers/Video'
import Channel from './containers/Channel'
import Loading from './components/Loading'
import Toast from './components/Toast'
import { CURRENT_USER_QUERY } from './queries/currentUser'
import { VIDEO_LIST_QUERY } from './queries/videoList'
import { AUTHENTICATE_MUTATION } from './mutations/authenticate'
import firebase from 'firebase/app'
import 'firebase/messaging'

const config = {
  messagingSenderId: '578692223559'
}
firebase.initializeApp(config)

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1,
    overflow: 'hidden'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64
      }
    }
  },
  'content-left': {
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'contentShift-left': {
    marginLeft: 0
  }
})

class Root extends Component {
  async componentDidMount() {
    this.messageListener = firebase.messaging().onMessage(payload => {
      console.log('MESSAGE RECEIVED ', payload)
      console.log('message received')
    })
    const token = localStorage.getItem('TOKEN')
    if (token) {
      let response = await this.props.authenticate({
        variables: { token }
      })
      if (response.data.authenticate.success) {
        Auth.authenticate()
        this.setState({
          authSnackbar: true,
          authSnackbarMessage: response.data.authenticate.message
        })
      }
    }
  }

  state = {
    open: false,
    menuOpen: false,
    searchText: '',
    filteredVideos: [],
    authSnackbar: false,
    authSnackbarMessage: '',
    user: null
  }

  handleDrawerOpen = () => this.setState({ open: true })

  handleDrawerClose = () => this.setState({ open: false })

  handleMenuOpen = () => this.setState({ menuOpen: true })

  handleMenuClose = () => this.setState({ menuOpen: false })

  handleAuthSnackClose = () => this.setState({ authSnackbar: false })

  handleChange = e => this.setState({ searchText: e.target.value })

  handleKeyUp = e => {
    const { searchText } = this.state
    const videos = this.props.data.getVideoList
    const filteredVideos = videos.filter(v =>
      v.title.toLowerCase().includes(searchText.toLowerCase())
    )
    this.setState({ filteredVideos })
  }

  render() {
    const {
      classes,
      data: { loading, getVideoList: videos },
      currentUser: { loading: loading2, currentUser: user }
    } = this.props
    if (loading || loading2) return <Loading />
    return [
      <BrowserRouter key="main-app">
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <RootAppBar
              open={this.state.open}
              menuOpen={this.state.menuOpen}
              searchText={this.state.searchText}
              handleChange={this.handleChange}
              handleKeyUp={this.handleKeyUp}
              handleMenuOpen={this.handleMenuOpen}
              handleMenuClose={this.handleMenuClose}
              handleDrawerOpen={this.handleDrawerOpen}
              handleDrawerClose={this.handleDrawerClose}
              filteredVideos={this.state.filteredVideos}
            />
            <main
              className={classNames(classes.content, classes[`content-left`], {
                [classes.contentShift]: this.state.open,
                [classes[`contentShift-left`]]: this.state.open
              })}
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/upload" component={Upload} />
                <PropsRoute
                  path="/channel/:userId?"
                  component={Auth.isAuthenticated ? Channel : Home}
                  user={user}
                />
                <Route path="/user/:userId" component={UserLanding} />
                <PropsRoute
                  path="/video/:videoId"
                  component={Auth.isAuthenticated ? Video : Home}
                  videos={
                    this.state.searchText ? this.state.filteredVideos : videos
                  }
                  user={user}
                />
              </Switch>
            </main>
          </div>
        </div>
      </BrowserRouter>,
      <Toast
        key="snackbar"
        open={this.state.authSnackbar}
        onClose={this.handleAuthSnackClose}
        message={this.state.authSnackbarMessage}
      />
    ]
  }
}

export default compose(
  withStyles(styles),
  graphql(VIDEO_LIST_QUERY),
  graphql(CURRENT_USER_QUERY, {
    options: props => ({ variables: { userId: null } }),
    name: 'currentUser'
  }),
  graphql(AUTHENTICATE_MUTATION, { name: 'authenticate' })
)(Root)
