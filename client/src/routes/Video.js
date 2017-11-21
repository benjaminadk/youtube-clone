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
    
    componentDidMount() {
        this.handleAddView()
    }
    
    handleAddView = async () => {
        const response = await this.props.addView({
            variables: { videoId: this.props.match.params.videoId }
        })
        console.log(response)
    }
    
    render(){
        const { data: { loading, getVideoById }} = this.props
        if(loading) return null
        const { title, description, url, poster, createdOn, views, owner: { id, username, imageUrl }} = getVideoById
        return(
            <div style={styles.CONTAINER}>
                <div>
                    <video src={url} controls style={styles.VIDEO}/>
                    <Typography type='headline'>{title}</Typography>
                    <div style={styles.VIDEO_STATS}>
                        <div>
                            <Typography type='subheading' style={styles.VIEWS}>{views} views</Typography>
                        </div>
                        <div>
                            <IconButton style={styles.SPACER}>
                                <ThumbsUpIcon/>&nbsp;
                                <Typography type='button'>109</Typography>
                            </IconButton>
                            <IconButton style={styles.SPACER}>
                                <ThumbsDownIcon/>&nbsp;
                                <Typography type='button'>8</Typography>
                            </IconButton>
                            <IconButton style={styles.SPACER}>
                                <ReplyIcon/>
                                <Typography type='button'>Share</Typography>
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
            </div>
            )
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
            owner {
                id
                username
                imageUrl
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

export default compose(
    graphql(ADD_VIEW_MUTATION, { name: 'addView' }),
    graphql(VIDEO_BY_ID_QUERY, { options: props => ({ variables: { videoId: props.match.params.videoId }})})
)(Video)