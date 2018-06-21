import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'react-apollo'
import classNames from 'classnames'
import { PropsRoute } from './utils'
//import { PrivateRoute } from './utils'
import RootAppBar from './components/RootAppBar'
import Home from './containers/Home'
import Upload from './containers/Upload'
import UserLanding from './containers/UserLanding'
import Video from './containers/Video'
import Channel from './containers/Channel'
import SearchResults from './containers/SearchResults'
import Loading from './components/Loading'
import { VIDEO_LIST_QUERY } from './queries/videoList'

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

class PersistentDrawer extends Component {
  state = {
    open: false,
    menuOpen: false,
    searchText: '',
    filteredVideos: []
  }

  handleDrawerOpen = () => this.setState({ open: true })

  handleDrawerClose = () => this.setState({ open: false })

  handleMenuOpen = () => this.setState({ menuOpen: true })

  handleMenuClose = () => this.setState({ menuOpen: false })

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
      data: { loading }
    } = this.props
    if (loading) return <Loading />
    return (
      <BrowserRouter>
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
            />
            <main
              className={classNames(classes.content, classes[`content-left`], {
                [classes.contentShift]: this.state.open,
                [classes[`contentShift-left`]]: this.state.open
              })}
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/upload" component={Upload} />
                <Route path="/channel/:userId?" component={Channel} />
                <Route path="/user/:userId" component={UserLanding} />
                <Route path="/video/:videoId" component={Video} />
                <PropsRoute
                  path="/search"
                  component={SearchResults}
                  videos={this.state.filteredVideos}
                />
              </Switch>
            </main>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const PersistentDrawerWithGraphql = graphql(VIDEO_LIST_QUERY)(PersistentDrawer)

export default withStyles(styles)(PersistentDrawerWithGraphql)
