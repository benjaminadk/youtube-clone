import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PlaylistIcon from '@material-ui/icons/VideoLibrary'
import Dropzone from 'react-dropzone'
import UploadPopover from './UploadPopover'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: '89vh'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '20% 80%',
    backgroundColor: 'white',
    height: '70vh',
    width: '75vw',
    marginTop: '3vh'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    height: '70vh',
    width: '15vw'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  pubProgContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '3vh'
  },
  progress: {
    height: '4vh',
    width: '50vw',
    marginRight: '5vh'
  },
  text: {
    color: theme.palette.background.default
  },
  publish: {
    height: '3vh',
    marginRight: '5vh'
  },
  thumbnail: {
    flexShrink: 0,
    maxWidth: '100%',
    maxHeight: '100%'
  },
  subGrid: {
    display: 'grid',
    gridTemplateColumns: '60% 40%'
  },
  subLeft: {
    display: 'flex',
    flexDirection: 'column',
    padding: '3vh'
  },
  subRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInput: {
    marginBottom: '4vh'
  },
  paddingLeft: {
    paddingLeft: '3vh',
    fontSize: '10px'
  },
  dropzone: {
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
  posterButton: {
    width: '75%',
    marginLeft: '3vh'
  },
  playlistButton: {
    marginTop: '15vh',
    width: '20vw'
  },
  textField: {
    marginLeft: '1vw',
    marginRight: '1vw',
    marginTop: '2vh',
    width: '23vw',
    color: theme.palette.text.primary
  },
  plusButton: {
    width: '25vw'
  },
  playlistIcon: {
    transform: 'scale(.75)'
  }
})

const UploadDetails = ({
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
  playlistButtonDisabled,
  classes
}) => (
  <div className={classes.container}>
    <div className={classes.grid}>
      <div className={classes.leftColumn}>
        <Dropzone
          className={classes.dropzone}
          accept="image/jpeg, image/png"
          multiple={false}
          onDrop={onDrop}
        >
          {!posterFile && (
            <Typography className={classes.text}>
              Click To Add Poster
            </Typography>
          )}
          {poster && (
            <img src={poster} alt="thumbnail" className={classes.thumbnail} />
          )}
        </Dropzone>
        {posterFile && (
          <Button
            className={classes.posterButton}
            variant="raised"
            color="secondary"
            onClick={handleUpload}
          >
            Upload Poster
          </Button>
        )}
        <div className={classes.paddingLeft}>
          <p>Upload Status: </p>
          <p>
            {progress === 100
              ? 'Upload Complete!'
              : progress > 0
                ? `Upload ${progress}% Complete`
                : null}
          </p>
          {completed && <Link to={`/video/${id}`}>Watch Your Video</Link>}
        </div>
      </div>
      <div className={classes.rightColumn} id="anchorEl">
        <div className={classes.pubProgContainer}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color="secondary"
            className={classes.progress}
          />
          <Button
            className={classes.publish}
            color="secondary"
            variant="raised"
            onClick={handleVideo}
            disabled={progress < 100 || completed}
          >
            Publish
          </Button>
        </div>
        <div className={classes.subGrid}>
          <div className={classes.subLeft}>
            <TextField
              label="Title"
              value={title}
              name="title"
              onChange={handleChange}
              fullWidth
              className={classes.textInput}
            />
            <TextField
              label="Description"
              value={description}
              name="description"
              onChange={handleChange}
              fullWidth
              multiline={true}
              rows={4}
              className={classes.textInput}
            />
          </div>
          <div className={classes.subRight}>
            <Button
              className={classes.playlistButton}
              onClick={handleOpenPopover}
              variant="raised"
              color="secondary"
              disabled={playlistButtonDisabled}
            >
              {playlistButtonText === '+ Add to playlist' ? (
                '+ Add to playlist'
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <PlaylistIcon className={classes.playlistIcon} />&nbsp;{
                    playlistButtonText
                  }
                </div>
              )}
            </Button>
            <UploadPopover
              popoverOpen={popoverOpen}
              anchorEl={document.getElementById('anchorEl')}
              handleClosePopover={handleClosePopover}
              handleSearchText={handleSearchText}
              handleSearch={handleSearch}
              handleCheckbox={handleCheckbox}
              handleCollapse={handleCollapse}
              handleNewPlaylistTitle={handleNewPlaylistTitle}
              handleCreatePlaylist={handleCreatePlaylist}
              newPlaylistTitle={newPlaylistTitle}
              searchText={searchText}
              playlists={playlists}
              collapsed={collapsed}
              processing={processing}
              state={state}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default withStyles(styles)(UploadDetails)
