import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Dropzone from 'react-dropzone'

const styles = {
    CONTAINER: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#F1F1F1',
        height: '100%'
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

class Upload extends Component {
    
    render(){
        return(
            <div style={styles.CONTAINER}>
                <Dropzone
                    style={styles.DROPZONE}
                    accept='video/webm'
                    multiple={false}
                >
                    <img 
                        src='https://s3-us-west-1.amazonaws.com/youtube-clone-assets/upload-background.svg'
                        alt='upload'
                        style={styles.IMAGE}
                    />
                    <Typography type='headline'>Select files to upload</Typography>
                    <br/>
                    <Typography>Or drag and drop video files</Typography>
                </Dropzone>
            </div>
            )
    }
}

export default Upload