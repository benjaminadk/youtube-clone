import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Dropzone from 'react-dropzone'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import axios from 'axios'


const styles = {
    CONTAINER: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
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
    state = {
        file: null,
        progress: 0
    }
    
    format = filename => {
        const d = new Date()
        const date = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`
        const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, "-")
        return `videos/${date}-${cleanFilename}`
    }
    
    uploadToS3 = async (file, requestUrl) => {
        const options = {
            headers: {
                'Content-Type': file.type
            },
            onUploadProgress: (progressEvent) => {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                console.log(percentCompleted)
                this.setState({ progress: percentCompleted })
            }
        }
        await axios.put(requestUrl, file, options)
    }
    
    onDrop = (files) => this.setState({ file: files[0]})
    
    handleUpload = async () => {
        const { file } = this.state
        const filename = this.format(file.name)
        const filetype = file.type
        const response = await this.props.s3Sign({
            variables: { filename, filetype }
        })
        const { requestUrl, videoUrl } = response.data.s3Sign
        await this.uploadToS3(file, requestUrl)
    }
    
    render(){
        const { file } = this.state
        return(
            <div style={styles.CONTAINER}>
                <Dropzone
                    style={styles.DROPZONE}
                    accept='video/webm'
                    multiple={false}
                    onDrop={this.onDrop}
                >
                    <img 
                        src='https://s3-us-west-1.amazonaws.com/youtube-clone-assets/upload-background.svg'
                        alt='upload'
                        style={styles.IMAGE}
                    />
                    <Typography type='headline'>Select files to upload</Typography>
                    <br/>
                    <Typography>Or drag and drop video files</Typography>
                    { file && <Typography>File: {file.name}</Typography> }
                </Dropzone>
                { file && <Button
                    raised
                    color='primary'
                    onClick={this.handleUpload}
                >
                    Upload
                </Button> }
            </div>
            )
    }
}

const S3_SIGN_MUTATION = gql`
    mutation($filename: String!, $filetype: String!) {
        s3Sign(filename: $filename, filetype: $filetype) {
            requestUrl
            videoUrl
        }
    }
`

const CREATE_VIDEO_MUTATION = gql`
    mutation($input: VideoInput) {
        createVideo(input: $input) {
            id
        }
    }
`

export default compose(
    graphql(S3_SIGN_MUTATION, { name: 's3Sign' }),
    graphql(CREATE_VIDEO_MUTATION, { name: 'createVideo' })
    )(Upload)