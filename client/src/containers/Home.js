import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    marginTop: '5vh',
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Home = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography variant="display3">YouTube Clone Tutorial</Typography>
    </div>
  )
}

export default withStyles(styles)(Home)
