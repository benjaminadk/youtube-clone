import React from 'react'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

const styles = {
    MODAL: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default ({ open, handleModalClose, cancelUpload, uploadBanner, progress }) => (
        <Dialog
            open={open}
            onRequestClose={handleModalClose}
            fullWidth
        >
        <DialogTitle>Upload Channel Banner</DialogTitle>
        <DialogContent style={styles.MODAL}>
            <CircularProgress
                value={progress}
                mode='determinate'
            />
        </DialogContent>
        <DialogActions>
            <Button 
                raised 
                color='primary'
                onClick={cancelUpload}
            >
                Cancel
            </Button>
            <Button 
                raised 
                color='primary'
                onClick={uploadBanner}
            >
                Upload
            </Button>
        </DialogActions>
        </Dialog>
        )

