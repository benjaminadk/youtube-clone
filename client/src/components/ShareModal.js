import React from 'react'
import { ShareButtons, generateShareIcon } from 'react-share'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import { reverseFormat } from '../utils'

const {
  TwitterShareButton,
  FacebookShareButton,
  GooglePlusShareButton,
  RedditShareButton
} = ShareButtons
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
  <Dialog open={open} onClose={handleShareModalClose} fullWidth>
    <DialogTitle>Share</DialogTitle>
    <DialogContent>
      <div style={styles.BUTTONS}>
        <FacebookShareButton url={linkToShare} style={styles.LINK}>
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton url={linkToShare} title={title} style={styles.LINK}>
          <TwitterIcon />
        </TwitterShareButton>
        <GooglePlusShareButton url={linkToShare} style={styles.LINK}>
          <GooglePlusIcon />
        </GooglePlusShareButton>
        <RedditShareButton url={linkToShare} title={title} style={styles.LINK}>
          <RedditIcon />
        </RedditShareButton>
      </div>
      <Divider style={styles.DIVIDER} />
      <TextField
        id="link-text"
        value={
          checked
            ? `${linkToShare}?time=${reverseFormat(currentTimeString)}`
            : linkToShare
        }
        onChange={onChange}
        fullWidth
      />
      <div>
        <p>Specific Time</p>
        <Checkbox checked={checked} onChange={handleCheckbox} />
        <TextField
          value={currentTimeString}
          onChange={handleShareModalTime}
          disabled={checked ? false : true}
        />
      </div>

      <Divider style={styles.DIVIDER} />
    </DialogContent>
    <DialogActions>
      <Button variant="raised" color="primary" onClick={handleEmbedModalOpen}>
        Embed
      </Button>
      <Button variant="raised" color="primary" onClick={onCopy}>
        Copy
      </Button>
    </DialogActions>
  </Dialog>
)
