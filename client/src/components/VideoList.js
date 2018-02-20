import React from 'react'
import Switch from 'material-ui/Switch'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import Popover from 'material-ui/Popover'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField'
import CheckIcon from 'material-ui-icons/CheckCircle'
import NewIcon from 'material-ui-icons/FiberNew'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import LockIcon from 'material-ui-icons/LockOutline'
import PublicIcon from 'material-ui-icons/Public'
import { Link } from 'react-router-dom'
import { setNewVideoTag, formatTime } from '../utils'
import '../styles/VideoList.css'

const styles = {
    OUTER_CONTAINER: {
        display: 'grid',
        gridTemplateColumns: '98% 2%',
        marginRight: '1vw'
    },
    CONTAINER: {
        marginLeft: '2vw',
        marginRight: '2vw'
    },
    FLEX_ROW: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    LIST_ITEM: {
        display: 'grid',
        gridTemplateColumns: '45% 55%',
        marginTop: '1vh',
        textDecoration: 'none'
    },
    POSTER: {
        width: '11.5vw',
        height: '6.5vw'
    },
    INFO: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '.25vw'
    },
    UP_NEXT: {
        marginTop: '2.5vh'
    },
    CHECK: {
        transform: 'scale(.5) translatey(-1.25vh)',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    NAME_ROW: {
        display: 'flex'
    },
    DIVIDER: {
        marginTop: '2vh',
        marginBottom: '2vh'
    },
    TITLE: {
        lineHeight: '1'
    },
    NEW: {
        transform: 'translate(1vw,-1vh)',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    POSTER_WRAPPER: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    DURATION: {
        fontFamily: 'Roboto',
        fontSize: '.70rem',
        paddingLeft: '2px',
        paddingRight: '2px',
        borderRadius: '2px',
        color: 'white',
        backgroundColor: '#000000BF',
        transform: 'translate(4vw, -3vh)'
    },
    ADD_TO: {
        padding: '1vw'
    },
    POPOVER: {
        width: '25vw',
        maxHeight: '75vh'
    },
    PLUS_BUTTON: {
        width: '25vw'  
    },
    CREATE_BUTTON: {
        width: '25vw',
        color: 'red'
    },
    TEXTFIELD: {
        marginLeft: '1vw',
        marginRight: '1vw',
        width: '23vw'
    },
    DENSE_LIST: {
        paddingTop: '0',
        paddingBottom: '0',
        marginTop: '0',
        marginBottom: '0'
    },
    LIST: {
        overflowY: 'scroll'
    }
}

export default ({ 
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
    state
}) => (
    <div style={styles.CONTAINER}>
        <div style={styles.FLEX_ROW}>
            <Typography id='up-next' type='title' style={styles.UP_NEXT}>Up Next</Typography>
            <Typography type='button'>AUTOPLAY<Switch/></Typography>
        </div>
        {videoList && videoList.map((v,i) => {
            return(
                <div 
                    key={`video-list-item-${i}`} 
                    style={styles.OUTER_CONTAINER}
                    className='video-list-item'
                >
                    <Link 
                        to={`/video/${v.id}`}
                        style={styles.LIST_ITEM}
                    >
                        <div style={styles.POSTER_WRAPPER}>
                            <img 
                                src={v.poster}
                                alt='poster'
                                style={styles.POSTER}
                            />
                            {v.duration > 0 ? <span style={styles.DURATION}>{formatTime(v.duration)}</span> : null}
                        </div>
                        <div style={styles.INFO}>
                            <Typography type='body2' style={styles.TITLE}>{v.title}</Typography>
                            <div style={styles.NAME_ROW}>
                                <Typography type='caption'>{v.owner.username}</Typography>
                                <CheckIcon style={styles.CHECK}/>
                            </div> 
                            <div style={styles.NAME_ROW}>
                                <Typography type='caption'>{v.views} views </Typography>
                                {setNewVideoTag(v.createdOn) ? <NewIcon style={styles.NEW}/> : null}
                            </div>
                        </div>
                    </Link>
                    <IconButton
                        onClick={() => handleMenuAnchor(i)}
                        className='more-vert-icon'
                        id={`anchor-${i}`}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={document.getElementById(`anchor-${i}`)}
                        open={state[`menu-${i}`]}
                        onRequestClose={() => handleMenuClose(i)}
                    >
                        <MenuItem onClick={handleMenuClose}>Not interested</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Add to Watch later</MenuItem>
                        <MenuItem onClick={() => handlePlaylistPopoverOpen(i)}>Add to playlist</MenuItem>
                    </Menu>
                    <Popover
                        open={state[`pop-${i}`]}
                        anchorEl={document.getElementById('up-next')}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                        onRequestClose={() => handlePlaylistPopoverClose(i)}
                    >
                        <div style={styles.POPOVER}>
                            <Typography style={styles.ADD_TO} type='title'>Add to...</Typography>
                            <Divider/>
                            <List 
                                dense
                                style={styles.LIST}    
                            >
                                <ListItem
                                    style={styles.DENSE_LIST}
                                >
                                    <Checkbox/>
                                    <ListItemText primary='Watch later'/>
                                    <LockIcon/>
                                </ListItem>
                                {playlists && playlists.map((p, ind) => {
                                    return(
                                        <ListItem 
                                            key={`playlist-item-${ind}`}
                                            style={styles.DENSE_LIST}
                                        >
                                            <Checkbox
                                                onClick={() => handlePlaylistCheckboxChange(i,ind,v.id,p.id)}
                                                checked={state[`${i}-${ind}`]}
                                            />
                                            <ListItemText
                                                primary={p.title.length > 30 ? `${p.title.slice(0,29)}...`  : p.title}
                                            />
                                            <PublicIcon/>
                                        </ListItem>
                                    )
                                })}
                            </List>
                            <Divider/>
                            {collapsed && <Button 
                                            onClick={handleCollapse}
                                            style={styles.PLUS_BUTTON}  
                                          >
                                            + Create new playlist
                                          </Button>}
                            {!collapsed && <div>
                                                <TextField
                                                    placeholder='Enter playlist name...'
                                                    label='Name'
                                                    helperText={`${newPlaylistTitle.length}/150`}
                                                    value={newPlaylistTitle}
                                                    onChange={handleNewPlaylistTitle}
                                                    style={styles.TEXTFIELD}
                                                />
                                                <br/>
                                                <TextField
                                                    label='Privacy'
                                                    disabled
                                                    style={styles.TEXTFIELD}
                                                />
                                                <br/>
                                                <Button 
                                                    onClick={() => handleCreatePlaylist(v.id)}
                                                    style={styles.CREATE_BUTTON}
                                                >
                                                    Create
                                                </Button>
                                           </div>}
                        </div>
                    </Popover>
                    {i === 0 ? <Divider style={styles.DIVIDER}/> : null}
                </div>
            )
        })}
    </div>
    )