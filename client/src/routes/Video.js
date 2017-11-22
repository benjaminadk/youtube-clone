import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ThumbsUpIcon from 'material-ui-icons/ThumbUp'
import ThumbsDownIcon from 'material-ui-icons/ThumbDown'
import ReplyIcon from 'material-ui-icons/Reply'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import { timeDifferenceForDate } from '../utils'
import ShareModal from '../components/ShareModal'
import Snackbar from 'material-ui/Snackbar'
import CloseIcon from 'material-ui-icons/Close'

const styles = {
    CONTAINER: {
        marginTop: '3vh',
        display: 'grid',
        gridTemplateColumns: '70% 30%'
    },
    VIDEO: {
        height: '72vh',
        marginLeft: '3vh'
    },
    VIDEO_STATS: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    VIEWS: {
        marginTop: '2vh'
    },
    SPACER: {
        marginRight: '3vh'
    },
    VIDEO_INFO: {
        display: 'grid',
        gridTemplateColumns: '10% 70% 20%',
        marginTop: '3vh',
        marginBottom: '3vh'
    },
    AVATAR: {
        height: '8vh',
        width: '8vh'
    },
    SUB_BUTTON: {
        backgroundColor: '#FF0000',
        color: '#FFFFFF',
        height: '6.5vh'
    }
}

class Video extends Component {
    state = {
        shareDialogOpen: false,
        copySnackbarOpen: false,
        linkToShare: ''
    }
    
    componentDidMount() {
        this.handleAddView()
        this.setState({ linkToShare: `https://youtube-clone-benjaminadk.c9users.io/video/${this.props.match.params.videoId}`})
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
    
    handleShareModalOpen = () => this.setState({ shareDialogOpen: true })
    
    handleShareModalClose = () => this.setState({ shareDialogOpen: false })
    
    handleShareModalText = (e) => this.setState({ linkToShare: e.target.value })
    
    handleCopy = () => {
        this.setState({ copySnackbarOpen: true })
        document.getElementById('link-text').select()
        document.execCommand("Copy")
    }
    
    handleCopySnackbarOpen = () => this.setState({ copySnackbarOpen: true })
    
    handleCopySnackbarClose = () => this.setState({ copySnackbarOpen: false })
    
    render(){
        const { data: { loading, getVideoById }} = this.props
        if(loading) return null
        const { title, description, url, poster, likes, dislikes, createdOn, views, owner: { id, username, imageUrl }} = getVideoById
        return([
            <div key='video-main-page' style={styles.CONTAINER}>
                <div>
                    <video src={url} controls style={styles.VIDEO}/>
                    <Typography type='headline'>{title}</Typography>
                    <div style={styles.VIDEO_STATS}>
                        <div>
                            <Typography type='subheading' style={styles.VIEWS}>{views} views</Typography>
                        </div>
                        <div>
                            <IconButton style={styles.SPACER} onClick={this.handleThumbs.bind(this, 'like')}>
                                <ThumbsUpIcon/>&nbsp;
                                <Typography type='button'>{likes}</Typography>
                            </IconButton>
                            <IconButton style={styles.SPACER} onClick={this.handleThumbs.bind(this, 'dislike')}>
                                <ThumbsDownIcon/>&nbsp;
                                <Typography type='button'>{dislikes}</Typography>
                            </IconButton>
                            <IconButton style={styles.SPACER}>
                                <ReplyIcon/>
                                <Typography type='button' onClick={this.handleShareModalOpen}>Share</Typography>
                            </IconButton>
                        </div>
                    </div>
                    <Divider/>
                        <div style={styles.VIDEO_INFO}>
                            <Avatar src={imageUrl} alt='user' style={styles.AVATAR}/>
                            <div>
                                <Typography type='title'>{username}</Typography>
                                <Typography>Posted {timeDifferenceForDate(createdOn)}</Typography>
                                <br/>
                                <br/>
                                <Typography>{description}</Typography>
                            </div>
                            <Button 
                                raised
                                style={styles.SUB_BUTTON}
                            >
                                Subscribe 123
                            </Button>
                        </div>
                    <Divider/>
                </div>
            </div>,
            <ShareModal     
                key='video-share-modal'
                open={this.state.shareDialogOpen}
                handleShareModalClose={this.handleShareModalClose}
                linkToShare={this.state.linkToShare}
                onChange={this.handleShareModalText}
                onCopy={this.handleCopy}
                title={title}
            />,
            <Snackbar
                key='video-copy-snackbar'
                open={this.state.copySnackbarOpen}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                autoHideDuration={8000}
                onRequestClose={this.handleCopySnackbarClose}
                message={<span>Video link copied to clipboard</span>}
                action={<IconButton onClick={this.handleCopySnackbarClose} color='inherit'><CloseIcon/></IconButton>}
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