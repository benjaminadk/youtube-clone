import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import AppsIcon from 'material-ui-icons/Apps'
import FileUploadIcon from 'material-ui-icons/FileUpload'
import NotificationsIcon from 'material-ui-icons/Notifications'
import HomeIcon from 'material-ui-icons/Home'
import SignInIcon from 'material-ui-icons/ExitToApp'
import AccountIcon from 'material-ui-icons/AccountBox'
import Avatar from 'material-ui/Avatar'
import { PrivateRoute } from '../utils'
import Home from './Home'
import Upload from './Upload'
import UserLanding from './UserLanding'
import Video from './Video'
import Channel from './Channel'

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
  link: {
    textDecoration: 'none',
    color: theme.palette.shades.light.text.primary
  },
  linkIcon: {
    color: '#FFFFFF'
  }
})

class PersistentDrawer extends Component {
  state = {
    open: false,
    menuOpen: false
  }

  handleDrawerOpen = () => this.setState({ open: true })
  
  handleDrawerClose = () => this.setState({ open: false })
  
  handleMenuOpen = () => this.setState({ menuOpen: true })
  
  handleMenuClose = () => this.setState({ menuOpen: false })

  render() {
    const { classes } = this.props
    const { open, menuOpen } = this.state
    const avatarUrl = window.localStorage.getItem('AVATAR') || 'http://via.placeholder.com/50x50'
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
                      <MenuItem>
                        <ListItemIcon><SignInIcon/></ListItemIcon>
                        <a href='/auth/google' className={classes.link}>Sign In with Google</a>
                      </MenuItem>
                      <MenuItem onClick={this.handleMenuClose}>
                        <ListItemIcon><AccountIcon/></ListItemIcon>
                        <Link to='/channel' className={classes.link}>My Channel</Link>
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
              </Switch>
            </main>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PersistentDrawer)