import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const styles = {
    CONTAINER: {
        marginTop: '3vh'
    },
    VIDEO: {
        height: '65vh'
    }
}

class Video extends Component {
    
    render(){
        const { data: { loading, getVideoById }} = this.props
        if(loading) return null
        const { title, description, url, poster, createdOn, owner: { id, username, imageUrl }} = getVideoById
        return(
            <div style={styles.CONTAINER}>
                <video src={url} controls style={styles.VIDEO}/>
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
            owner {
                id
                username
                imageUrl
            }
        }
    }
`

export default graphql(VIDEO_BY_ID_QUERY, {
    options: props => ({ variables: { videoId: props.match.params.videoId }})
})(Video)