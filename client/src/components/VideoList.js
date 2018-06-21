import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import CheckIcon from '@material-ui/icons/CheckCircle'
import NewIcon from '@material-ui/icons/FiberNew'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import LockIcon from '@material-ui/icons/LockOutline'
import PublicIcon from '@material-ui/icons/Public'
import { Link } from 'react-router-dom'
import { setNewVideoTag, formatTime } from '../utils'
import '../styles/VideoList.css'

const styles = theme => ({
  container: {
    marginLeft: '2vw',
    marginRight: '2vw'
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  upNext: {
    marginTop: '2.5vh'
  },
  outerContainer: {
    display: 'grid',
    gridTemplateColumns: '98% 2%',
    marginRight: '1vw'
  },
  listItem: {
    display: 'grid',
    gridTemplateColumns: '45% 55%',
    marginTop: '1vh',
    textDecoration: 'none'
  },
  posterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  poster: {
    width: '11.5vw',
    height: '6.5vw'
  },
  duration: {
    fontFamily: 'Roboto',
    fontSize: '.70rem',
    paddingLeft: '2px',
    paddingRight: '2px',
    borderRadius: '2px',
    color: 'white',
    backgroundColor: '#000000BF',
    transform: 'translate(4vw, -3vh)'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '.25vw'
  },
  title: {
    lineHeight: '1'
  },
  nameRow: {
    display: 'flex'
  },
  check: {
    transform: 'scale(.5) translatey(-1.25vh)',
    color: theme.palette.text.secondary
  },
  new: {
    transform: 'translate(1vw,-1vh)',
    color: theme.palette.text.secondary
  },
  popover: {
    width: '25vw',
    maxHeight: '75vh'
  },
  addTo: {
    padding: '1vw'
  },
  list: {
    overflowY: 'scroll'
  },
  denseList: {
    paddingTop: '0',
    paddingBottom: '0',
    marginTop: '0',
    marginBottom: '0'
  },
  plusButton: {
    width: '25vw'
  },
  textField: {
    marginLeft: '1vw',
    marginRight: '1vw',
    width: '23vw'
  },
  createButton: {
    width: '25vw',
    color: 'red'
  },
  divider: {
    marginTop: '2vh',
    marginBottom: '2vh'
  }
})

const VideoList = ({
  videoList,
  handleMenuAnchor,
  anchorEl,
  handleMenuClose,
  handlePlaylistPopoverOpen,
  handlePlaylistPopoverClose,
  handleCollapse,
  collapsed,
  playlists,
  newPlaylistTitle,
  handleNewPlaylistTitle,
  handleCreatePlaylist,
  handlePlaylistCheckbox,
  handlePlaylistCheckboxChange,
  state,
  classes
}) => (
  <div className={classes.container}>
    <div className={classes.flexRow}>
      <Typography id="up-next" variant="title" className={classes.upNext}>
        Up Next
      </Typography>
      <Typography variant="button">
        AUTOPLAY<Switch />
      </Typography>
    </div>
    {videoList &&
      videoList.map((v, i) => {
        return (
          <div
            key={`video-list-item-${i}`}
            className={`video-list-item ${classes.outerContainer}`}
          >
            <Link to={`/video/${v.id}`} className={classes.listItem}>
              <div className={classes.posterWrapper}>
                <img src={v.poster} alt="poster" className={classes.poster} />
                {v.duration > 0 ? (
                  <span className={classes.duration}>
                    {formatTime(v.duration)}
                  </span>
                ) : null}
              </div>
              <div className={classes.info}>
                <Typography variant="body2" className={classes.title}>
                  {v.title}
                </Typography>
                <div className={classes.nameRow}>
                  <Typography variant="caption">{v.owner.username}</Typography>
                  <CheckIcon className={classes.check} />
                </div>
                <div className={classes.nameRow}>
                  <Typography variant="caption">{v.views} views </Typography>
                  {setNewVideoTag(v.createdOn) ? (
                    <NewIcon className={classes.new} />
                  ) : null}
                </div>
              </div>
            </Link>
            <IconButton
              onClick={() => handleMenuAnchor(i)}
              className="more-vert-icon"
              id={`anchor-${i}`}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={document.getElementById(`anchor-${i}`)}
              open={state[`menu-${i}`]}
              onClose={() => handleMenuClose(i)}
            >
              <MenuItem onClick={handleMenuClose}>Not interested</MenuItem>
              <MenuItem onClick={handleMenuClose}>Add to Watch later</MenuItem>
              <MenuItem onClick={() => handlePlaylistPopoverOpen(i)}>
                Add to playlist
              </MenuItem>
            </Menu>
            <Popover
              open={state[`pop-${i}`]}
              anchorEl={document.getElementById('up-next')}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              onClose={() => handlePlaylistPopoverClose(i)}
            >
              <div className={classes.popover}>
                <Typography className={classes.addTo} variant="title">
                  Add to...
                </Typography>
                <Divider />
                <List dense className={classes.list}>
                  <ListItem className={classes.denseList}>
                    <Checkbox />
                    <ListItemText primary="Watch later" />
                    <LockIcon />
                  </ListItem>
                  {playlists &&
                    playlists.map((p, ind) => {
                      return (
                        <ListItem
                          key={`playlist-item-${ind}`}
                          className={classes.denseList}
                        >
                          <Checkbox
                            onClick={() =>
                              handlePlaylistCheckboxChange(i, ind, v.id, p.id)
                            }
                            checked={state[`${i}-${ind}`]}
                          />
                          <ListItemText
                            primary={
                              p.title.length > 30
                                ? `${p.title.slice(0, 29)}...`
                                : p.title
                            }
                          />
                          <PublicIcon />
                        </ListItem>
                      )
                    })}
                </List>
                <Divider />
                {collapsed && (
                  <Button
                    onClick={handleCollapse}
                    className={classes.plusButton}
                  >
                    + Create new playlist
                  </Button>
                )}
                {!collapsed && (
                  <div>
                    <TextField
                      placeholder="Enter playlist name..."
                      label="Name"
                      helperText={`${newPlaylistTitle.length}/150`}
                      value={newPlaylistTitle}
                      onChange={handleNewPlaylistTitle}
                      className={classes.textField}
                    />
                    <br />
                    <TextField
                      label="Privacy"
                      disabled
                      className={classes.textField}
                    />
                    <br />
                    <Button
                      onClick={() => handleCreatePlaylist(v.id)}
                      className={classes.createButton}
                    >
                      Create
                    </Button>
                  </div>
                )}
              </div>
            </Popover>
            {i === 0 ? <Divider className={classes.divider} /> : null}
          </div>
        )
      })}
  </div>
)

export default withStyles(styles)(VideoList)
