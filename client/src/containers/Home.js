import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { graphql, compose } from 'react-apollo'
import Typography from '@material-ui/core/Typography'
import Loading from '../components/Loading'
import { ALL_USERS_QUERY } from '../queries/allUsers'

const styles = theme => ({
  root: {
    marginTop: '5vh'
  },
  user: {
    marginTop: '2.5vh',
    marginLeft: '2vw'
  }
})

const Home = ({ data: { loading, allUsers }, classes }) => {
  if (loading) return <Loading />
  return (
    <div className={classes.root}>
      {allUsers.map(u => (
        <div key={`home-${u.username}`} className={classes.user}>
          <Typography variant="title">{u.username}</Typography>
          <Typography variant="title">{u.email}</Typography>
          <Typography variant="title">{u.createdOn}</Typography>
          <img src={u.imageUrl} alt={u.id} />
        </div>
      ))}
    </div>
  )
}

export default compose(
  withStyles(styles),
  graphql(ALL_USERS_QUERY)
)(Home)
