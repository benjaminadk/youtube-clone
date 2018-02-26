import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import classNames from 'classnames'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Input from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import MenuIcon from 'material-ui-icons/Menu'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import AppsIcon from 'material-ui-icons/Apps'
import FileUploadIcon from 'material-ui-icons/FileUpload'
import NotificationsIcon from 'material-ui-icons/Notifications'
import HomeIcon from 'material-ui-icons/Home'
import SignInIcon from 'material-ui-icons/ExitToApp'
import AccountIcon from 'material-ui-icons/AccountBox'
import SearchIcon from 'material-ui-icons/Search'
import SettingsIcon from 'material-ui-icons/Settings'
import Avatar from 'material-ui/Avatar'
import { PrivateRoute, PropsRoute } from '../utils'
import Home from './Home'
import Upload from './Upload'
import UserLanding from './UserLanding'
import Video from './Video'
import Channel from './Channel'
import SearchResults from './SearchResults'
import { VIDEO_LIST_QUERY } from '../queries'

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingRight: '20px',
    width: '20vw'
  },
  toolbarCenter: {
    paddingRight: '20px',
    width: '50vw',
    display: 'flex'
  },
  searchContainer: {
    backgroundColor: 'white'
  },
  search: {
    width: '43vw',
    height: '5vh',
    paddingLeft: '1vw'
  },
  searchButton: {
    width: '3vw',
    backgroundColor: '#5b5b5b',
    color: '#c4c4c4',
    height: '5vh',
    '&:hover': {
      backgroundColor: '#5b5b5b',
      color: 'white'
    }
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.shades.light.text.primary,
    display: 'flex'
  },
  linkIcon: {
    color: '#FFFFFF'
  },
  menuTop: {
    height: '6vh',
    backgroundColor: 'lightgrey',
    transform: 'translatey(-8px)'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '.5vw'
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
    const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(searchText.toLowerCase()))
    this.setState({ filteredVideos })
  }

  render() {
    const { classes } = this.props
    const { open, menuOpen, searchText, filteredVideos } = this.state
    const avatarUrl = window.localStorage.getItem('AVATAR') || 'http://via.placeholder.com/50x50'
    const username = window.localStorage.getItem('USERNAME') || ''
    const email = window.localStorage.getItem('EMAIL') || ''
    const drawer = (
      <Drawer
        type="persistent"
        classes={{ paper: classes.drawerPaper }}
        anchor='left'
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>
            <Link to='/' className={classes.link}>
              <ListItem button>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary='Home'/>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List className={classes.list}></List>
        </div>
      </Drawer>
    )

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
                [classes[`appBarShift-left`]]: open,
              })}
            >
              <Toolbar disableGutters={!open} className={classes.toolbar}>
                  <IconButton
                    color="contrast"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <div className={classes.toolbarCenter}>
                    <FormControl className={classes.searchContainer}>
                      <Input
                        className={classes.search}
                        disableUnderline
                        placeholder='Search'
                        value={searchText}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                      />
                    </FormControl>
                      <Link to='/search'>
                        <Button
                          className={classes.searchButton}
                        >
                          <SearchIcon/>
                        </Button>
                      </Link>
                  </div>
                  <div className={classes.toolbarRight}>
                    <Link to='/upload' className={classes.linkIcon}><FileUploadIcon/></Link>
                    <AppsIcon/>
                    <NotificationsIcon/>
                    <Avatar 
                      id='avatar' 
                      src={avatarUrl}
                      onClick={this.handleMenuOpen}
                    />
                    <Menu
                      open={menuOpen}
                      anchorEl={document.getElementById('avatar')}
                      onRequestClose={this.handleMenuClose}
                    >
                      <MenuItem className={classes.menuTop}>
                        <Avatar src={avatarUrl} />
                        <div className={classes.userInfo}>
                          <Typography type='title'>{username}</Typography>
                          <Typography type='body2'>{email}</Typography>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <a href='/auth/google' className={classes.link}>
                          <ListItemIcon><SignInIcon/></ListItemIcon>
                          <span>Sign In with Google</span>
                        </a>
                      </MenuItem>
                      <MenuItem onClick={this.handleMenuClose}>
                        <Link to='/channel' className={classes.link}>
                          <ListItemIcon><AccountIcon/></ListItemIcon>
                          <span>My Channel</span>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to='/creator-studio' className={classes.link}>
                          <ListItemIcon><SettingsIcon/></ListItemIcon>
                          <span>Creator Studio</span>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </div>
              </Toolbar>
            </AppBar>
            {drawer}
            <main
              className={classNames(classes.content, classes[`content-left`], {
                [classes.contentShift]: open,
                [classes[`contentShift-left`]]: open,
              })}
            >
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/upload' component={Upload}/>
                <Route path='/channel/:userId?' component={Channel}/>
                <Route path='/user/:userId' component={UserLanding}/>
                <Route path='/video/:videoId' component={Video}/>
                <PropsRoute path='/search' component={SearchResults} videos={filteredVideos}/>
              </Switch>
            </main>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const PersistentDrawerWithGraphql = graphql(VIDEO_LIST_QUERY)(PersistentDrawer)

export default withStyles(styles, { withTheme: true })(PersistentDrawerWithGraphql)