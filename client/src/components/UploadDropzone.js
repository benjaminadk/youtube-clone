import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dropzone from 'react-dropzone'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '95vh'
  },
  dropzone: {
    backgroundColor: 'white',
    border: 'none',
    height: '60vh',
    width: '50vw',
    marginTop: '5vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer'
  },
  image: {
    margin: '15vh auto 3vh',
    height: '14vh',
    width: '10vw'
  },
  upload: {
    width: '50vw',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  }
})

const UploadDropzone = ({ onDrop, file, handleUpload, classes }) => (
  <div className={classes.root}>
    <Dropzone
      className={classes.dropzone}
      accept="video/webm"
      multiple={false}
      onDrop={onDrop}
    >
      <img
        src="https://s3-us-west-1.amazonaws.com/youtube-clone-assets/upload-background.svg"
        alt="upload"
        className={classes.image}
      />
      <Typography variant="title" color="inherit">
        Select files to upload
      </Typography>
      <br />
      <Typography variant="title" color="inherit">
        Or drag and drop video files
      </Typography>
      {file && (
        <Typography
          variant="body2"
          color="inherit"
          style={{ marginTop: '2vh' }}
        >
          File: {file.name}
        </Typography>
      )}
    </Dropzone>
    {file && (
      <Button
        variant="raised"
        color="secondary"
        size="large"
        className={classes.upload}
        onClick={handleUpload}
      >
        Upload
      </Button>
    )}
  </div>
)

export default withStyles(styles)(UploadDropzone)
