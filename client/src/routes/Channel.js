import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import axios from 'axios'
import SwipeableViews from 'react-swipeable-views'
import ChannelDropzone from '../components/ChannelDropzone'
import ChannelAppBar from '../components/ChannelAppBar'
import Videos from '../components/ChannelTabs/Videos'

class Channel extends Component {
    
    state = {
        file: null,
        progress: 0,
        tabIndex: 0
    }
    
    format = filename => {
        const d = new Date()
        const date = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`
        const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, "-")
        return `banners/${date}-${cleanFilename}`
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
    
    handleBannerUpload = async () => {
        const { file } = this.state
        const filename = this.format(file.name)
        const filetype = file.type
        const response = await this.props.s3SignBanner({ variables: { filename, filetype }})
        const { requestUrl, bannerUrl } = response.data.s3SignBanner
        await this.uploadToS3(file, requestUrl)
        await this.props.addBanner({ variables: { bannerUrl }})
        await this.setState({ file: null })
    }
    
    handleTabs = (e, tabIndex) => this.setState({ tabIndex })
    
    handleTabIndex = tabIndex => this.setState({ tabIndex })
    
    onDrop = (files) => this.setState({ file: files[0] })
    
    render(){
        const { data: { loading, currentUser }} = this.props
        if(loading) return null
        const { videos, imageUrl, username } = currentUser
        return(
            <div>
                <ChannelDropzone
                    onDrop={this.onDrop}
                    file={this.state.file}
                />
                <ChannelAppBar
                    tabIndex={this.state.tabIndex}
                    handleTabs={this.handleTabs}
                    username={username}
                    imageUrl={imageUrl}
                />
                <SwipeableViews
                    axis='x'
                    index={this.state.tabIndex}
                    onChangeIndex={this.handleTabIndex}
                    enableMouseEvents
                >
                    <div>home</div>
                    <Videos videos={videos}/>
                    <div>THREE</div>
                </SwipeableViews>
            </div>
            )
    }
}

const CURRENT_USER_QUERY = gql`
    query {
        currentUser {
            username
            email
            imageUrl
            createdOn
            videos {
                id
                title
                url
                description
                createdOn
                poster
                views
                likes
            }
        }
    }
`

const S3_SIGN_BANNER_MUTATION = gql`
    mutation($filename: String!, $filetype: String!) {
        s3SignBanner(filename: $filename, filetype: $filetype) {
            requestUrl
            bannerUrl
        }
    }
`

const ADD_BANNER_MUTATION = gql`
    mutation($bannerUrl: String!) {
        addBanner(bannerUrl: $bannerUrl) {
            bannerUrl
        }
    }
`

export default compose(
    graphql(S3_SIGN_BANNER_MUTATION, { name: 's3SignBanner' }),
    graphql(ADD_BANNER_MUTATION, { name: 'addBanner' }),
    graphql(CURRENT_USER_QUERY)
    )(Channel)