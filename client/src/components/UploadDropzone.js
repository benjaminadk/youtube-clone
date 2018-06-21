import React from 'react'
import Dropzone from 'react-dropzone'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = {
  CONTAINER: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: '89vh'
  },
  DROPZONE: {
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
  IMAGE: {
    margin: '15vh auto 3vh',
    height: '14vh',
    width: '10vw'
  }
}

export default ({ onDrop, file, handleUpload }) => (
  <div style={styles.CONTAINER}>
    <Dropzone
      style={styles.DROPZONE}
      accept="video/webm"
      multiple={false}
      onDrop={onDrop}
    >
      <img
        src="https://s3-us-west-1.amazonaws.com/youtube-clone-assets/upload-background.svg"
        alt="upload"
        style={styles.IMAGE}
      />
      <Typography type="headline">Select files to upload</Typography>
      <br />
      <Typography>Or drag and drop video files</Typography>
      {file && <Typography>File: {file.name}</Typography>}
    </Dropzone>
    {file && (
      <Button variant="raised" color="primary" onClick={handleUpload}>
        Upload
      </Button>
    )}
  </div>
)
