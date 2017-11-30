import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import axios from 'axios'
import UploadDropzone from '../components/UploadDropzone'
import UploadDetails from '../components/UploadDetails'

class Upload extends Component {
    state = {
        file: null,
        progress: 0,
        dropzone: true,
        title: '',
        description: '',
        url: '',
        completed: false,
        id: '',
        poster: '',
        posterFile: null
    }
    
    format = (filename, folder) => {
        const d = new Date()
        const date = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`
        const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, "-")
        return `${folder}/${date}-${cleanFilename}`
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
    
    onDropVideo = (files) => this.setState({ file: files[0]})
    
    onDropPoster = (files) => this.setState({ posterFile: files[0]})
    
    handleUploadVideo = async () => {
        const { file } = this.state
        const filename = this.format(file.name, 'videos')
        const filetype = file.type
        const response = await this.props.s3Sign({
            variables: { filename, filetype }
        })
        const { requestUrl, videoUrl } = response.data.s3Sign
        await this.setState({ dropzone: false, title: filename, url: videoUrl })
        await this.uploadToS3(file, requestUrl)
    }
    
    handleUploadPoster = async () => {
        const { posterFile } = this.state
        const filename = this.format(posterFile.name, 'images')
        const filetype = posterFile.type
        const response = await this.props.s3SignPoster({
            variables: { filename, filetype }
        })
        const { requestUrl, posterUrl} = response.data.s3SignPoster
        await this.setState({ poster: posterUrl })
        await this.uploadToS3(posterFile, requestUrl)
    }
    
    handleVideo = async () => {
        const { title, description, url } = this.state
        const poster = this.state.poster ? this.state.poster : 'https://s3-us-west-1.amazonaws.com/youtube-clone-assets/thumbnail.jpeg'
        const response2 = await this.props.createVideo({
            variables: { input: { title, description, url, poster }}
        })
        const { id } = response2.data.createVideo
        await this.setState({ completed: true, title: '', description: '', id })
    }
    
    handleChange = e => this.setState({ [e.target.name]: e.target.value })
    
    render(){
        const { file, progress, dropzone, title, description, id, completed, poster, posterFile } = this.state
        if(dropzone) return(
                <UploadDropzone
                    onDrop={this.onDropVideo}
                    file={file}
                    handleUpload={this.handleUploadVideo}
                />
            )
        if(!dropzone) return(
                <UploadDetails
                    progress={progress}
                    completed={completed}
                    id={id}
                    description={description}
                    title={title}
                    poster={poster}
                    posterFile={posterFile}
                    handleChange={this.handleChange}
                    handleVideo={this.handleVideo}
                    handleUpload={this.handleUploadPoster}
                    onDrop={this.onDropPoster}
                />
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

const S3_SIGN_POSTER_MUTATION = gql`
    mutation($filename: String!, $filetype: String!) {
        s3SignPoster(filename: $filename, filetype: $filetype) {
            requestUrl
            posterUrl
        }
    }
`

export default compose(
    graphql(S3_SIGN_MUTATION, { name: 's3Sign' }),
    graphql(S3_SIGN_POSTER_MUTATION, { name: 's3SignPoster' }),
    graphql(CREATE_VIDEO_MUTATION, { name: 'createVideo' })
    )(Upload)