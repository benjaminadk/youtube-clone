import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Dropzone from 'react-dropzone'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import axios from 'axios'
import { LinearProgress } from 'material-ui/Progress'
import TextField from 'material-ui/TextField'
import { Link } from 'react-router-dom'

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
        border: '1px solid black',
        margin: '3vh'
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
        flexDirection: 'column'
    },
    TEXT_INPUT: {
        marginBottom: '4vh'
    },
    PADDING_LEFT: {
        paddingLeft: '3vh',
        fontSize: '10px'
    }
}

class Upload extends Component {
    state = {
        file: null,
        progress: 0,
        dropzone: true,
        title: '',
        description: '',
        url: '',
        poster: '',
        completed: false,
        id: ''
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
        await this.setState({ dropzone: false, title: filename, url: videoUrl })
        await this.uploadToS3(file, requestUrl)
    }
    
    handleVideo = async () => {
        const { title, description, url, poster } = this.state
        const response2 = await this.props.createVideo({
            variables: { input: { title, description, url, poster }}
        })
        const { id } = response2.data.createVideo
        await this.setState({ completed: true, title: '', description: '', id })
    }
    
    handleChange = e => this.setState({ [e.target.name]: e.target.value })
    
    render(){
        const { file, progress, dropzone, title, description, id, completed } = this.state
        const thumbnail = 'http://via.placeholder.com/150x100'
        if(dropzone) return(
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
        if(!dropzone) return(
            <div style={styles.CONTAINER}>
                <div style={styles.GRID}>
                    <div style={styles.LEFT_COLUMN}>
                        <img src={thumbnail} alt='thumbnail' style={styles.THUMBNAIL}/>
                        <div style={styles.PADDING_LEFT}>
                            <p>Upload Status: </p>
                            <p>{progress === 100 ? 'Upload Complete!' : progress > 0 ? `Upload ${progress}% Complete` : null}</p>
                            {completed && <Link to={`/video/${id}`}>Watch Your Video</Link>}
                        </div>
                    </div>
                    <div style={styles.RIGHT_COLUMN}>
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
                                onClick={this.handleVideo}
                                disabled={progress < 100}
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
                                    onChange={this.handleChange}
                                    fullWidth
                                    style={styles.TEXT_INPUT}
                                />
                                <TextField
                                    label='Description'
                                    value={description}
                                    name='description'
                                    onChange={this.handleChange}
                                    fullWidth
                                    multiline={true}
                                    rows={4}
                                    style={styles.TEXT_INPUT}
                                />
                            </div>
                            <div style={styles.SUB_RIGHT}>

                            </div>
                        </div>
                    </div>
                </div>
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