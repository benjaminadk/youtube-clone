import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

var countries = require('country-list')().getNames()

const styles = theme => ({
  input: {
    marginBottom: '2vh',
    color: theme.palette.text.primary
  },
  label: {
    color: theme.palette.text.primary
  },
  shrink: {
    color: theme.palette.text.primary
  }
})

const AboutModal = ({
  open,
  closeAboutModal,
  saveAboutForm,
  about,
  country,
  links,
  onChange,
  onChangeCountry,
  classes
}) => (
  <Dialog open={open} onClose={closeAboutModal} fullWidth>
    <DialogTitle>About Your Channel</DialogTitle>
    <DialogContent>
      <FormControl>
        <InputLabel>Description</InputLabel>
        <Input
          className={classes.input}
          name="aboutForm"
          value={about}
          onChange={onChange}
          fullWidth
          multiline
        />
        <FormHelperText>Enter a Description for your Channel</FormHelperText>
      </FormControl>
      <br />
      <br />
      <FormControl>
        <InputLabel>Country</InputLabel>
        <Select
          name="countryForm"
          value={country}
          onChange={onChangeCountry}
          input={<Input className={classes.input} />}
        >
          {countries.map((c, i) => (
            <MenuItem key={`country-${i}`} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Where are you from?</FormHelperText>
      </FormControl>
      <br />
      <br />
      <FormControl>
        <InputLabel>Social Media Links</InputLabel>
        <Input
          className={classes.input}
          name="linksForm"
          value={links}
          onChange={onChange}
          fullWidth
        />
        <FormHelperText>
          List your Social Media Links seperated by commas
        </FormHelperText>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeAboutModal}>Cancel</Button>
      <Button onClick={saveAboutForm} variant="raised" color="secondary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
)

export default withStyles(styles)(AboutModal)
