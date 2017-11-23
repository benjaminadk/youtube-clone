import React from 'react'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

export default ({ open, handleEmbedModalClose, onCopy, url }) => (
        <Dialog
            open={open}
            onRequestClose={handleEmbedModalClose}
            fullWidth
        >
            <DialogTitle>Embed</DialogTitle>
            <DialogContent>
                <TextField
                    id='iframe-text'
                    value={`<iframe src=${url} width="560" height="315" frameborder="0" allowfullscreen></iframe>`}
                    multiline
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCopy}>Copy</Button>
            </DialogActions>
        </Dialog>
    )