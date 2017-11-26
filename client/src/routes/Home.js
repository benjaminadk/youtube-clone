import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Home = ({ data: { loading, allUsers }}) => {
   if(loading)return null
    return (
        <div>
            {allUsers.map(u => (
                <div key={`home-${u.username}`}>
                    <h3>{u.username}</h3>
                    <h3>{u.email}</h3>
                    <h3>{u.createdOn}</h3>
                    <img src={u.imageUrl} alt={u.id}/>
                </div>
            ))}
        </div>
        )
}

const ALL_USERS_QUERY = gql`
    query {
        allUsers {
            id
            username
            email
            imageUrl
            createdOn
        }
    }
`

export default graphql(ALL_USERS_QUERY)(Home) 