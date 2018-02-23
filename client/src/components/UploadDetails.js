import React from 'react'
import { LinearProgress } from 'material-ui/Progress'
import TextField from 'material-ui/TextField'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Popover from 'material-ui/Popover'
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Input, { InputAdornment } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import PublicIcon from 'material-ui-icons/Public'
import SearchIcon from 'material-ui-icons/Search'
import PlaylistIcon from 'material-ui-icons/VideoLibrary'
import Dropzone from 'react-dropzone'

const styles = {
    CONTAINER: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        height: '89vh'
    },
    GRID: {
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        backgroundColor: 'white',
        height: '70vh',
        width: '75vw',
        marginTop: '3vh'
    },
    LEFT_COLUMN: {
        display: 'flex',
        flexDirection: 'column',
        height: '70vh',
        width: '15vw'
    },
    RIGHT_COLUMN: {
        display: 'flex',
        flexDirection: 'column'
    },
    PUB_PROG_CONTAINER: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '3vh'
    },
    PROGRESS: {
        height: '4vh',
        width: '50vw',
        marginRight: '5vh'
    },
    PUBLISH: {
        height: '3vh',
        marginRight: '5vh'
    },
    THUMBNAIL: {
        flexShrink: 0,
        maxWidth: '100%',
        maxHeight: '100%'
    },
    SUB_GRID: {
        display: 'grid',
        gridTemplateColumns: '60% 40%'
    },
    SUB_LEFT: {
        display: 'flex',
        flexDirection: 'column',
        padding: '3vh'
    },
    SUB_RIGHT: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    TEXT_INPUT: {
        marginBottom: '4vh'
    },
    PADDING_LEFT: {
        paddingLeft: '3vh',
        fontSize: '10px'
    },
    DROPZONE: {
        height: '12.5vh',
        width: '22vh',
        backgroundColor: 'lightgrey',
        margin: '3vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: '2px solid black',
        overflow: 'hidden'
    },
    POSTER_BUTTON: {
        width: '75%',
        marginLeft: '3vh'
    },
    PLAYLIST_BUTTON: {
        marginTop: '15vh',
        width: '20vw',
        border: '1px solid',
        backgroundColor: '#E0E0E0'
    },
    POPOVER: {
        width: '25vw',
        maxHeight: '75vh'
    },
    DENSE_LIST: {
        paddingTop: '0',
        paddingBottom: '0',
        marginTop: '0',
        marginBottom: '0'
    },
    LIST_OVERFLOW: {
        overflowY: 'auto',
        maxHeight: '40vh'
    },
    TEXTFIELD: {
        marginLeft: '1vw',
        marginRight: '1vw',
        width: '23vw'
    },
    PLUS_BUTTON: {
        width: '25vw'  
    },
    CREATE_BUTTON: {
        width: '25vw',
        color: 'red'
    },
    SEARCH: {
        width: '21vw',
        margin: '3vh 2vw 0 2vw',
        border: '1px solid'
    },
    SEARCH_ICON: {
        transform: 'translatey(1vh)'
    },
    PLAYLIST_ICON: {
        transform: 'scale(.75)'
    }
}

export default ({ 
    progress, 
    completed, 
    id, 
    description, 
    title, 
    handleVideo, 
    handleChange,
    handleUpload,
    onDrop,
    poster,
    posterFile,
    playlistButtonText,
    handleOpenPopover,
    handleClosePopover,
    popoverOpen,
    playlists,
    collapsed,
    newPlaylistTitle,
    handleNewPlaylistTitle,
    handleCollapse,
    handleCreatePlaylist,
    searchText,
    handleSearchText,
    handleSearch,
    state,
    handleCheckbox,
    processing,
    playlistButtonDisabled
}) => (
    <div style={styles.CONTAINER}>
        <div style={styles.GRID}>
            <div style={styles.LEFT_COLUMN}>
                <Dropzone
                    style={styles.DROPZONE}
                    accept='image/jpeg, image/png'
                    multiple={false}
                    onDrop={onDrop}
                >
                {!posterFile && <Typography style={styles.TEXT}>Click To Add Poster</Typography>}
                {poster && <img src={poster} alt='thumbnail' style={styles.THUMBNAIL}/>}
                </Dropzone>
                {posterFile && <Button 
                    style={styles.POSTER_BUTTON}
                    raised 
                    dense
                    color='primary'
                    onClick={handleUpload}
                    >
                        Upload Poster
                    </Button>}
                <div style={styles.PADDING_LEFT}>
                    <p>Upload Status: </p>
                    <p>{progress === 100 ? 'Upload Complete!' : progress > 0 ? `Upload ${progress}% Complete` : null}</p>
                    {completed && <Link to={`/video/${id}`}>Watch Your Video</Link>}
                </div>
            </div>
            <div style={styles.RIGHT_COLUMN} id='anchorEl'>
                <div style={styles.PUB_PROG_CONTAINER}>
                    <LinearProgress 
                        mode='determinate'
                        value={progress}
                        style={styles.PROGRESS}
                    />
                    <Button 
                        style={styles.PUBLISH}
                        color='primary'
                        raised
                        onClick={handleVideo}
                        disabled={progress < 100 || completed}
                    >
                        Publish
                    </Button>
                </div>
                <div style={styles.SUB_GRID}>
                    <div style={styles.SUB_LEFT}>
                        <TextField 
                            label='Title'
                            value={title}
                            name='title'
                            onChange={handleChange}
                            fullWidth
                            style={styles.TEXT_INPUT}
                        />
                        <TextField
                            label='Description'
                            value={description}
                            name='description'
                            onChange={handleChange}
                            fullWidth
                            multiline={true}
                            rows={4}
                            style={styles.TEXT_INPUT}
                        />
                    </div>
                    <div style={styles.SUB_RIGHT}>
                        <Button
                            style={styles.PLAYLIST_BUTTON}
                            onClick={handleOpenPopover}
                            disabled={playlistButtonDisabled}
                        >
                            {playlistButtonText === '+ Add to playlist' ? '+ Add to playlist' : <div style={{display: 'flex', justifyContent: 'center'}}><PlaylistIcon style={styles.PLAYLIST_ICON}/>&nbsp;{playlistButtonText}</div>}
                        </Button>
                        <Popover
                            open={popoverOpen}
                            anchorEl={document.getElementById('anchorEl')}
                            onRequestClose={handleClosePopover}
                        >
                            <div style={styles.POPOVER}>
                                <FormControl style={styles.SEARCH}>
                                    <Input
                                        onChange={handleSearchText}
                                        onKeyUp={handleSearch}
                                        value={searchText}
                                        disableUnderline
                                        startAdornment={<InputAdornment position="start" style={styles.SEARCH_ICON}><SearchIcon/></InputAdornment>}
                                    />
                                </FormControl>
                                <List 
                                    dense
                                    style={styles.LIST_OVERFLOW}    
                                >
                                    {playlists && playlists.map((p,i) => {
                                        return(
                                            <ListItem
                                                key={`playlist-item-${i}`}
                                                style={styles.DENSE_LIST}
                                            >
                                                <Checkbox
                                                    checked={state[`checkbox-${i}`]}
                                                    onChange={() => handleCheckbox(i,p.title)}
                                                />
                                                <ListItemText primary={p.title.length > 30 ? `${p.title.slice(0,29)}...`  : p.title}/>
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
                                                Create new playlist
                                               </Button>}
                                {!collapsed && <div>
                                                {processing && <LinearProgress />}
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
                                                    onClick={handleCreatePlaylist}
                                                    style={styles.CREATE_BUTTON}
                                                >
                                                    Create
                                                </Button>
                                           </div>}
                            </div>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )