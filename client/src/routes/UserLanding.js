import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Auth } from '../utils'
class UserLanding extends Component {
    
    render(){
        const { data: { loading, getUserById } } = this.props
        if(loading) return null
        const { username, imageUrl, jwt } = getUserById
        if(username) Auth.authenticate()
        window.localStorage.setItem('TOKEN', jwt)
        window.localStorage.setItem('AVATAR', imageUrl)
        return(
            <div>
                <h1>Hey {username}. Welcome to You Tube Clone</h1>
            </div>
            )
    }
}

const USER_BY_ID_QUERY = gql`
    query($userId: ID!){
        getUserById(userId: $userId){
            username
            imageUrl
            jwt
        }
    }
`

export default graphql(USER_BY_ID_QUERY, {
    options: props => ({ variables: {userId: props.match.params.userId }})
})(UserLanding)