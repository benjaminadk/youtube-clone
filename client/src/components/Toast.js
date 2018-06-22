import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

export default props => (
  <Snackbar
    open={props.open}
    onClose={props.onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    autoHideDuration={8000}
    message={
      <Typography variant="body2" color="inherit" align="center">
        {props.message}
      </Typography>
    }
    action={
      <IconButton onClick={props.onClose} color="inherit">
        <CloseIcon />
      </IconButton>
    }
  />
)
