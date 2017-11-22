import React from 'react'
import { ShareButtons, generateShareIcon } from 'react-share'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

const { 
    TwitterShareButton, 
    FacebookShareButton, 
    GooglePlusShareButton,
    RedditShareButton } = ShareButtons
const TwitterIcon = generateShareIcon('twitter')
const FacebookIcon = generateShareIcon('facebook')
const GooglePlusIcon = generateShareIcon('google')
const RedditIcon = generateShareIcon('reddit')

const styles = {
    BUTTONS: {
        display: 'flex'
    },
    DIVIDER: {
        marginTop: '1vh',
        marginBottom: '1vh'
    },
    LINK: {
        cursor: 'pointer',
        marginRight: '1vh'
    }
}

export default ({ open, handleShareModalClose, linkToShare, onChange, onCopy, title }) => (
    <Dialog 
        open={open}
        onRequestClose={handleShareModalClose}
        fullWidth
    >
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
            <div style={styles.BUTTONS}>
                <FacebookShareButton url={linkToShare} style={styles.LINK}>
                    <FacebookIcon/>
                </FacebookShareButton>
                <TwitterShareButton url={linkToShare} title={title} style={styles.LINK}>
                    <TwitterIcon/>
                </TwitterShareButton>
                <GooglePlusShareButton url={linkToShare} style={styles.LINK}>
                    <GooglePlusIcon/>
                </GooglePlusShareButton>
                <RedditShareButton url={linkToShare} title={title} style={styles.LINK}>
                    <RedditIcon/>
                </RedditShareButton>
            </div>
            <Divider style={styles.DIVIDER}/>
            <TextField
                id='link-text'
                value={linkToShare}
                onChange={onChange}
                fullWidth
            />
            <Divider style={styles.DIVIDER}/>
        </DialogContent>
        <DialogActions>
            <Button>Embed</Button>
            <Button onClick={onCopy}>Copy</Button>
        </DialogActions>
    </Dialog>
    )