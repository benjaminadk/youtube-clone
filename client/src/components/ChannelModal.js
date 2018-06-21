import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
  MODAL: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default ({
  open,
  handleModalClose,
  cancelUpload,
  uploadBanner,
  progress
}) => (
  <Dialog open={open} onClose={handleModalClose} fullWidth>
    <DialogTitle>Upload Channel Banner</DialogTitle>
    <DialogContent style={styles.MODAL}>
      <LinearProgress value={progress} mode="determinate" color="primary" />
    </DialogContent>
    <DialogActions>
      <Button variant="raised" color="secondary" onClick={cancelUpload}>
        Cancel
      </Button>
      <Button variant="raised" color="primary" onClick={uploadBanner}>
        Upload
      </Button>
    </DialogActions>
  </Dialog>
)
