import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

var countries = require('country-list')().getNames()

const styles = {
  INPUT: {
    marginBottom: '2vh'
  }
}

export default ({
  open,
  closeAboutModal,
  saveAboutForm,
  about,
  country,
  links,
  onChange,
  onChangeCountry
}) => (
  <Dialog open={open} onClose={closeAboutModal} fullWidth>
    <DialogTitle>About Your Channel</DialogTitle>
    <DialogContent>
      <TextField
        style={styles.INPUT}
        name="aboutForm"
        value={about}
        onChange={onChange}
        label="Description"
        fullWidth
        helperText="Enter a Description for your Channel"
        multiline
      />
      <FormControl style={styles.INPUT}>
        <InputLabel>Country</InputLabel>
        <Select
          name="countryForm"
          value={country}
          onChange={onChangeCountry}
          input={<Input />}
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
      <TextField
        style={styles.INPUT}
        name="linksForm"
        value={links}
        onChange={onChange}
        label="Social Media Links"
        fullWidth
        helperText="List your Social Media Links seperated by commas"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={closeAboutModal} variant="secondary">
        Cancel
      </Button>
      <Button onClick={saveAboutForm} variant="raised" color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
)
