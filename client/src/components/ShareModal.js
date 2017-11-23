import React from 'react'
import { ShareButtons, generateShareIcon } from 'react-share'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { reverseFormat } from '../utils'

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

export default ({ 
    open, 
    handleShareModalClose, 
    linkToShare, 
    onChange, 
    onCopy, 
    title,  
    currentTimeString,
    checked,
    handleCheckbox,
    handleEmbedModalOpen,
    handleShareModalTime
}) => (
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
                value={checked ? `${linkToShare}?time=${reverseFormat(currentTimeString)}` : linkToShare}
                onChange={onChange}
                fullWidth
            />
            <div>
                <p>Specific Time</p>
                <Checkbox
                    checked={checked}
                    onChange={handleCheckbox}
                />
                <TextField
                    value={currentTimeString}
                    onChange={handleShareModalTime}
                    disabled={checked ? false : true}
                />
            </div>
                
            <Divider style={styles.DIVIDER}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleEmbedModalOpen}>Embed</Button>
            <Button onClick={onCopy}>Copy</Button>
        </DialogActions>
    </Dialog>
    )