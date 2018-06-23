import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ShareButtons, generateShareIcon } from 'react-share'
import Dialog from '@material-ui/core/Dialog'
//import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
//import DialogActions from '@material-ui/core/DialogActions'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
//import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import CodeIcon from '@material-ui/icons/Code'
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

const styles = theme => ({
  buttons: {
    display: 'flex'
  },
  divider: {
    marginTop: '3vh',
    marginBottom: '3vh'
  },
  link: {
    cursor: 'pointer',
    marginRight: '2vh',
    borderRadius: '50%',
    overflow: 'hidden'
  },
  formControl: {
    marginBottom: '3vh'
  },
  input: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    padding: '2px 5px'
  },
  copy: {
    color: '#2793e6'
  },
  embed: {
    height: '64px',
    width: '64px',
    borderRadius: '50%',
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.divider,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '2vh'
  },
  names: {
    display: 'flex'
  },
  name: {
    width: '64px',
    marginRight: '2vh',
    display: 'flex',
    justifyContent: 'center'
  },
  input2: {
    color: theme.palette.text.primary
  }
})

const links = ['Embed', 'Facebook', 'Twitter', 'Google+', 'Reddit']

const ShareModal = ({
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
  handleShareModalTime,
  classes
}) => (
  <Dialog open={open} onClose={handleShareModalClose} fullWidth>
    <DialogContent>
      <div className={classes.buttons}>
        <div className={classes.embed} onClick={handleEmbedModalOpen}>
          <CodeIcon />
        </div>
        <FacebookShareButton url={linkToShare} className={classes.link}>
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton
          url={linkToShare}
          title={title}
          className={classes.link}
        >
          <TwitterIcon />
        </TwitterShareButton>
        <GooglePlusShareButton url={linkToShare} className={classes.link}>
          <GooglePlusIcon />
        </GooglePlusShareButton>
        <RedditShareButton
          url={linkToShare}
          title={title}
          className={classes.link}
        >
          <RedditIcon />
        </RedditShareButton>
      </div>
      <div className={classes.names}>
        {links.map(l => (
          <Typography key={l} variant="body2" className={classes.name}>
            {l}
          </Typography>
        ))}
      </div>

      <Divider className={classes.divider} />
      <FormControl id="link-text" className={classes.formControl} fullWidth>
        <Input
          value={
            checked
              ? `${linkToShare}?time=${reverseFormat(currentTimeString)}`
              : linkToShare
          }
          onChange={onChange}
          fullWidth
          disabled
          className={classes.input}
          endAdornment={
            <InputAdornment position="end">
              <Button className={classes.copy} onClick={onCopy}>
                Copy
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
      <div>
        <Typography variant="body2">Specific Time</Typography>
        <Checkbox checked={checked} onChange={handleCheckbox} />
        <Input
          value={currentTimeString}
          onChange={handleShareModalTime}
          disabled={checked ? false : true}
          className={classes.input2}
        />
      </div>
    </DialogContent>
  </Dialog>
)

export default withStyles(styles)(ShareModal)
