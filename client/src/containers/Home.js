import React from 'react'
import { graphql } from 'react-apollo'
import { ALL_USERS_QUERY } from '../queries/allUsers'

const Home = ({ data: { loading, allUsers } }) => {
  if (loading) return null
  return (
    <div>
      {allUsers.map(u => (
        <div key={`home-${u.username}`}>
          <h3>{u.username}</h3>
          <h3>{u.email}</h3>
          <h3>{u.createdOn}</h3>
          <img src={u.imageUrl} alt={u.id} />
        </div>
      ))}
    </div>
  )
}

export default graphql(ALL_USERS_QUERY)(Home)
