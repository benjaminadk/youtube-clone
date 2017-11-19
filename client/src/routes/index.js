import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Home from './Home'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import AppsIcon from 'material-ui-icons/Apps'
import FileUploadIcon from 'material-ui-icons/FileUpload'
import AddAlertIcon from 'material-ui-icons/AddAlert'
import HomeIcon from 'material-ui-icons/Home'
import Avatar from 'material-ui/Avatar'

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
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
    width: drawerWidth,
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
    padding: theme.spacing.unit * 3,
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
    textDecoration: 'none'
  },
  linkIcon: {
    color: '#FFFFFF'
  }
})

class PersistentDrawer extends Component {
  state = {
    open: false
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props
    const { open } = this.state

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
                    <AddAlertIcon/>
                    <Avatar src='http://via.placeholder.com/50x50' />
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
                <Route path='/' component={Home}/>
              </Switch>
            </main>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PersistentDrawer)