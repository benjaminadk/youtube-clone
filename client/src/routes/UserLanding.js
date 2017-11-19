import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class UserLanding extends Component {
    
    render(){
        const { data: { loading, getUserById } } = this.props
        console.log(getUserById)
        if(loading) return null
        return(
            <div>{getUserById.username}</div>
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