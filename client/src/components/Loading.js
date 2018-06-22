import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10vh',
    marginBottom: '10vh'
  }
})

const Loading = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress
      variant="indeterminate"
      color="secondary"
      size={100}
      thickness={3}
    />
  </div>
)

export default withStyles(styles)(Loading)
