import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import axios from 'axios'
import SwipeableViews from 'react-swipeable-views'
import ChannelDropzone from '../components/ChannelDropzone'
import ChannelAppBar from '../components/ChannelAppBar'
import ChannelModal from '../components/ChannelModal'
import ChannelSettingsModal from '../components/ChannelSettingsModal'
import Videos from '../components/ChannelTabs/Videos'

class Channel extends Component {
    
    state = {
        file: null,
        progress: 0,
        tabIndex: 0,
        modal: false,
        sortMenu: false,
        sortBy: 'newest',
        videoList: 'upload',
        settingsModal: false,
        bannerPosition: null,
        searchMode: false,
        searchString: ''
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
        await this.handleCancelUpload()
    }
    
    sortControl = (videos, sortBy) => {
        if(sortBy === 'newest') return videos.reverse()
        if(sortBy === 'oldest') return videos
        if(sortBy === 'popular') {
            return videos.sort((a,b) => b.views - a.views)
        }
    }
    
    saveBannerPosition = async () => {
        const { bannerPosition } = this.state
        await this.props.addBannerPosition({ 
            variables: { bannerPosition },
            refetchQueries: [{
                query: CURRENT_USER_QUERY
            }]
        })
        await this.setState({ bannerPosition: null, settingsModal: false })
    }
    
    handleTabs = (e, tabIndex) => this.setState({ tabIndex })
    
    handleTabIndex = tabIndex => this.setState({ tabIndex })
    
    onDrop = (files) => this.setState({ file: files[0], modal: true })
    
    handleModalClose = () => this.setState({ modal: false })
    
    handleCancelUpload = () => this.setState({ file: null, modal: false })
    
    handleOpenSortMenu = () => this.setState({ sortMenu: true })
    
    handleCloseSortMenu = () => this.setState({ sortMenu: false })
    
    handleSortBy = sortBy => this.setState({ sortBy, sortMenu: false })
    
    handleOpenSettingsModal = () => this.setState({ settingsModal: true })
    
    handleCloseSettingsModal = () => this.setState({ settingsModal: false })
    
    handleBannerPosition = (e,bannerPosition) => this.setState({ bannerPosition })
    
    handleVideoList = type => this.setState({ videoList: type})
    
    handleSearchString = (e) => this.setState({ searchString: e.target.value })
    
    handleSearchMode = () => this.setState({ searchMode: true })
    
    render(){
        const { data: { loading, currentUser }} = this.props
        if(loading) return null
        const { videos, imageUrl, username, bannerUrl, bannerPosition } = currentUser
        const sortedVideos = this.sortControl(videos.slice(), this.state.sortBy)
        return(
            <div>
                <ChannelDropzone
                    onDrop={this.onDrop}
                    file={this.state.file}
                    bannerUrl={bannerUrl}
                    bannerPosition={bannerPosition}
                />
                <ChannelAppBar
                    tabIndex={this.state.tabIndex}
                    handleTabs={this.handleTabs}
                    username={username}
                    imageUrl={imageUrl}
                    openSettingsModal={this.handleOpenSettingsModal}
                    searchMode={this.state.searchMode}
                    searchString={this.state.searchString}
                    handleSearchMode={this.handleSearchMode}
                    handleSearchString={this.handleSearchString}
                />
                <SwipeableViews
                    axis='x'
                    index={this.state.tabIndex}
                    onChangeIndex={this.handleTabIndex}
                    enableMouseEvents
                >
                    <div>home</div>
                    <Videos 
                        videos={sortedVideos}
                        handleOpenSortMenu={this.handleOpenSortMenu}
                        handleCloseSortMenu={this.handleCloseSortMenu}
                        sortMenu={this.state.sortMenu}
                        handleSortBy={this.handleSortBy}
                        sortBy={this.state.sortBy}
                        handleVideoList={this.handleVideoList}
                        videoList={this.state.videoList}
                    />
                    <div>THREE</div>
                    <div>FOUR</div>
                    <div>FIVE</div>
                    <div>SIX</div>
                </SwipeableViews>
                <ChannelModal
                    open={this.state.modal}
                    handleModalClose={this.handleModalClose}
                    cancelUpload={this.handleCancelUpload}
                    uploadBanner={this.handleBannerUpload}
                    progress={this.state.progress}
                />
                <ChannelSettingsModal
                    open={this.state.settingsModal}
                    closeSettingsModal={this.handleCloseSettingsModal}
                    bannerPosition={this.state.bannerPosition}
                    setBannerPosition={this.handleBannerPosition}
                    saveBannerPosition={this.saveBannerPosition}
                />
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
            bannerUrl
            bannerPosition
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

const ADD_BANNER_POSITION_MUTATION = gql`
    mutation($bannerPosition: String!) {
        addBannerPosition(bannerPosition: $bannerPosition) {
            bannerPosition
        }
    }
`

export default compose(
    graphql(S3_SIGN_BANNER_MUTATION, { name: 's3SignBanner' }),
    graphql(ADD_BANNER_MUTATION, { name: 'addBanner' }),
    graphql(ADD_BANNER_POSITION_MUTATION, { name: 'addBannerPosition' }),
    graphql(CURRENT_USER_QUERY)
    )(Channel)