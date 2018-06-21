import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import AppsIcon from '@material-ui/icons/Apps'
import FileUploadIcon from '@material-ui/icons/FileUpload'
import NotificationsIcon from '@material-ui/icons/Notifications'
import HomeIcon from '@material-ui/icons/Home'
import SignInIcon from '@material-ui/icons/ExitToApp'
import AccountIcon from '@material-ui/icons/AccountBox'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'
import Avatar from '@material-ui/core/Avatar'

const drawerWidth = 239

const styles = theme => ({
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'appBarShift-left': {
    marginLeft: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
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
    ...theme.mixins.toolbar
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
  cornerLogo: {
    height: '20px',
    transform: 'translatex(-80px)'
  },
  toolbarCenter: {
    paddingRight: '20px',
    width: '50vw',
    display: 'flex'
  },
  searchContainer: {
    backgroundColor: '#121212'
  },
  search: {
    width: '43vw',
    height: '5vh',
    paddingLeft: '1vw',
    color: theme.palette.text.primary
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
  avatar: {
    cursor: 'pointer'
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    color: theme.palette.text.primary
  },
  linkIcon: {
    color: theme.palette.text.primary
  },
  menuTop: {
    height: '6vh',
    backgroundColor: '#939393',
    transform: 'translatey(-8px)'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '.5vw'
  }
})

class RouteAppBar extends Component {
  render() {
    const {
      classes,
      open,
      menuOpen,
      searchText,
      handleChange,
      handleKeyUp,
      handleMenuOpen,
      handleMenuClose,
      handleDrawerOpen,
      handleDrawerClose
    } = this.props
    const avatarUrl =
      localStorage.getItem('AVATAR') || 'http://via.placeholder.com/50x50'
    const username = localStorage.getItem('USERNAME') || ''
    const email = localStorage.getItem('EMAIL') || ''
    const userId = localStorage.getItem('USER_ID') || ''
    const drawer = (
      <Drawer
        variant="persistent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List className={classes.list} />
        </div>
      </Drawer>
    )
    return (
      <div>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes[`appBarShift-left`]]: open
          })}
        >
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <div>
              <img
                src="https://s3-us-west-1.amazonaws.com/youtube-clone-assets/corner-logo.png"
                alt="youtube"
                className={classes.cornerLogo}
              />
            </div>
            <div
              className={classes.toolbarCenter}
              ref={ref => (this.anchor = ref)}
            >
              <FormControl className={classes.searchContainer}>
                <Input
                  className={classes.search}
                  disableUnderline
                  placeholder="Search"
                  value={searchText}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              <Link to="/search">
                <Button className={classes.searchButton}>
                  <SearchIcon />
                </Button>
              </Link>
            </div>
            <div className={classes.toolbarRight}>
              <Link to="/upload" className={classes.linkIcon}>
                <FileUploadIcon />
              </Link>
              <AppsIcon />
              <NotificationsIcon />
              <Avatar
                id="avatar"
                src={avatarUrl}
                onClick={handleMenuOpen}
                className={classes.avatar}
              />
              <Menu
                open={menuOpen}
                anchorEl={document.getElementById('avatar')}
                onClose={handleMenuClose}
              >
                <MenuItem className={classes.menuTop}>
                  <Avatar src={avatarUrl} />
                  <div className={classes.userInfo}>
                    <Typography variant="title">{username}</Typography>
                    <Typography variant="body2">{email}</Typography>
                  </div>
                </MenuItem>
                <MenuItem>
                  <a href="/auth/google" className={classes.link}>
                    <ListItemIcon>
                      <SignInIcon />
                    </ListItemIcon>
                    <span>Sign In with Google</span>
                  </a>
                </MenuItem>
                {userId && (
                  <MenuItem onClick={handleMenuClose}>
                    <Link to={`/channel/${userId}`} className={classes.link}>
                      <ListItemIcon>
                        <AccountIcon />
                      </ListItemIcon>
                      <span>My Channel</span>
                    </Link>
                  </MenuItem>
                )}
                <MenuItem>
                  <Link to="/creator-studio" className={classes.link}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <span>Creator Studio</span>
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        {drawer}
      </div>
    )
  }
}

export default withStyles(styles)(RouteAppBar)
