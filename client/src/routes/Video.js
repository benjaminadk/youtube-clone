import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import ShareModal from '../components/ShareModal'
import Snackbar from 'material-ui/Snackbar'
import CloseIcon from 'material-ui-icons/Close'
import queryString from 'query-string'
import EmbedModal from '../components/EmbedModal'
import { formatTime } from '../utils'
import IconButton from 'material-ui/IconButton'
import VideoMain from '../components/VideoMain'
import VideoList from '../components/VideoList'

const styles = {
    CONTAINER: {
        marginTop: '3vh',
        display: 'grid',
        gridTemplateColumns: '70% 30%'
    }
}

class Video extends Component {
    state = {
        shareDialogOpen: false,
        copySnackbarOpen: false,
        embedDialogOpen: false,
        linkToShare: '',
        checked: false,
        currentTime: 0,
        currentTimeString: '0:00'
    }
    
    componentDidMount() {
        this.handleAddView()
        setTimeout(this.handleTimeQuery, 2500)
        this.setState({ linkToShare: `https://youtube-clone-benjaminadk.c9users.io${this.props.location.pathname}` })
    }
    
    handleTimeQuery = () => {
        const time = queryString.parse(this.props.location.search).time || 0
        this.setState({ currentTime: time, currentTimeString: formatTime(time) })
        if(time > 0) this.videoElement.currentTime = time
    }
    
    handleAddView = async () => {
        await this.props.addView({ variables: { videoId: this.props.match.params.videoId } })
    }
    
    handleThumbs = async (control) => {
        const likesArray = this.props.data.getVideoById.owner.likes
        const dislikesArray = this.props.data.getVideoById.owner.dislikes
        const { videoId } = this.props.match.params
        const likedId = likesArray.find(l => l === videoId)
        const dislikedId = dislikesArray.find(d => d === videoId)
        if(!dislikedId && !likedId) {
            if(control === 'like') {
                let remove = false
                return await this.props.addLike({ 
                    variables: { videoId, remove },
                    refetchQueries: [{
                        query: VIDEO_BY_ID_QUERY,
                        variables: { videoId }
                    }]
                })
            } else if(control === 'dislike') {
                let remove = false
                return await this.props.addDislike({
                    variables: { videoId, remove },
                    refetchQueries: [{
                        query: VIDEO_BY_ID_QUERY,
                        variables: { videoId }
                    }]
                })
            }
        } else if(!dislikedId && likedId) {
            if(control === 'like') {
                let remove = true
                return await this.props.addLike({
                    variables: { videoId, remove },
                    refetchQueries: [{
                        query: VIDEO_BY_ID_QUERY,
                        variables: { videoId }
                    }]
                })
            } else if(control === 'dislike') return
        } else if(dislikedId && !likedId) {
            if(control === 'dislike') {
                let remove = true
                return await this.props.addDislike({
                    variables: { videoId, remove },
                    refetchQueries: [{
                        query: VIDEO_BY_ID_QUERY,
                        variables: { videoId }
                    }]
                })
            } else if(control === 'like') return
        }
    }
    
    handleCopy = (control) => {
        this.setState({ copySnackbarOpen: true })
        if(control === 'share'){
            document.getElementById('link-text').select()
            document.execCommand("Copy")
        } else if(control === 'embed') {
            document.getElementById('iframe-text').select()
            document.execCommand("Copy")
        }

    }
    
    handleShareModalOpen = () => this.setState({ shareDialogOpen: true })
    
    handleShareModalClose = () => this.setState({ shareDialogOpen: false })
    
    handleShareModalText = (e) => this.setState({ linkToShare: e.target.value })
    
    handleShareModalTime = (e) => this.setState({ currentTimeString: e.target.value })
    
    handleEmbedModalClose = () => this.setState({ embedDialogOpen: false })
    
    handleEmbedModalOpen = () => this.setState({ embedDialogOpen: true, shareDialogOpen: false })
    
    handleCopySnackbarOpen = () => this.setState({ copySnackbarOpen: true })
    
    handleCopySnackbarClose = () => this.setState({ copySnackbarOpen: false })
    
    handleCheckbox = () => this.setState({ checked: !this.state.checked })
    
    render(){
        const { data: { loading, getVideoById }} = this.props
        if(loading) return null
        const { title, description, url, poster, likes, dislikes, createdOn, views, owner: { id, username, imageUrl }} = getVideoById
        return([
            <div key='video-main-page' style={styles.CONTAINER}>
                <VideoMain
                    videoRef={(video) => { this.videoElement = video }}
                    url={url}
                    description={description}
                    poster={poster}
                    likes={likes}
                    dislikes={dislikes}
                    createdOn={createdOn}
                    views={views}
                    username={username}
                    imageUrl={imageUrl}
                    title={title}
                    handleThumbsDislike={this.handleThumbs.bind(this, 'dislike')}
                    handleThumbsLike={this.handleThumbs.bind(this, 'like')}
                    handleShareModalOpen={this.handleShareModalOpen}
                />
                <VideoList/>
            </div>,
            <ShareModal     
                key='video-share-modal'
                open={this.state.shareDialogOpen}
                handleShareModalClose={this.handleShareModalClose}
                handleEmbedModalOpen={this.handleEmbedModalOpen}
                linkToShare={this.state.linkToShare}
                currentTimeString={this.state.currentTimeString}
                onChange={this.handleShareModalText}
                onCopy={this.handleCopy.bind(this, 'share')}
                title={title}
                checked={this.state.checked}
                handleCheckbox={this.handleCheckbox}
                handleShareModalTime={this.handleShareModalTime}
            />,
            <Snackbar
                key='video-copy-snackbar'
                open={this.state.copySnackbarOpen}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                autoHideDuration={8000}
                onRequestClose={this.handleCopySnackbarClose}
                message={<span>Copied to clipboard</span>}
                action={<IconButton onClick={this.handleCopySnackbarClose} color='inherit'><CloseIcon/></IconButton>}
            />,
            <EmbedModal
                key='video-embed-modal'
                open={this.state.embedDialogOpen}
                handleEmbedModalClose={this.handleEmbedModalClose}
                url={url}
                onCopy={this.handleCopy.bind(this, 'embed')}
            />
            ])
    }
}

const VIDEO_BY_ID_QUERY = gql`
    query($videoId: ID!) {
        getVideoById(videoId: $videoId) {
            title
            description
            url
            poster
            createdOn
            views
            likes
            dislikes
            owner {
                id
                username
                imageUrl
                likes
                dislikes
            }
        }
    }
`

const ADD_VIEW_MUTATION = gql`
    mutation($videoId: ID!) {
        addView(videoId: $videoId){
            views
        }
    }
`

const ADD_LIKE_MUTATION = gql`
    mutation($videoId: ID!, $remove: Boolean!) {
        addLike(videoId: $videoId, remove: $remove) {
            likes
        }
    }
`

const ADD_DISLIKE_MUTATION = gql`
    mutation($videoId: ID!, $remove: Boolean!) {
        addDislike(videoId: $videoId, remove: $remove) {
            dislikes
        }
    }
`

export default compose(
    graphql(ADD_VIEW_MUTATION, { name: 'addView' }),
    graphql(ADD_LIKE_MUTATION, { name: 'addLike' }),
    graphql(ADD_DISLIKE_MUTATION, { name: 'addDislike' }),
    graphql(VIDEO_BY_ID_QUERY, { options: props => ({ variables: { videoId: props.match.params.videoId }})})
)(Video)