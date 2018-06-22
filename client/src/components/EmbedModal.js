import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

export default ({ open, handleEmbedModalClose, onCopy, url }) => (
  <Dialog open={open} onClose={handleEmbedModalClose} fullWidth>
    <DialogTitle>Embed</DialogTitle>
    <DialogContent>
      <Input
        id="iframe-text"
        value={`<iframe src=${url} width="560" height="315" frameborder="0" allowfullscreen></iframe>`}
        multiline
        fullWidth
        style={{ color: '#DDDDDD' }}
      />
    </DialogContent>
    <DialogActions>
      <Button style={{ color: '#2793e6' }} onClick={onCopy}>
        Copy
      </Button>
    </DialogActions>
  </Dialog>
)
