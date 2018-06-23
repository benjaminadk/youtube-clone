import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'

export default ({
  open,
  handleModalClose,
  cancelUpload,
  uploadBanner,
  progress
}) => (
  <Dialog open={open} onClose={handleModalClose} fullWidth>
    <DialogTitle>Upload Channel Banner</DialogTitle>
    <DialogContent>
      <LinearProgress
        value={progress}
        variant="determinate"
        color="secondary"
        style={{ height: '3vh' }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={cancelUpload}>Cancel</Button>
      <Button variant="raised" color="secondary" onClick={uploadBanner}>
        Upload
      </Button>
    </DialogActions>
  </Dialog>
)
