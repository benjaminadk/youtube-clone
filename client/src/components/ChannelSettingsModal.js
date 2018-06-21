import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const positions = [
  { value: '0%', label: 'Top' },
  { value: '25%', label: 'Mid-Top' },
  { value: '50%', label: 'Middle' },
  { value: '75%', label: 'Mid-Bottom' },
  { value: '100%', label: 'Bottom' }
]

const renderRadioButtons = () =>
  positions.map((p, i) => (
    <FormControlLabel
      key={i}
      value={p.value}
      control={<Radio />}
      label={p.label}
    />
  ))

export default ({
  open,
  closeSettingsModal,
  bannerPosition,
  setBannerPosition,
  saveBannerPosition
}) => (
  <Dialog open={open} onClose={closeSettingsModal} fullWidth>
    <DialogTitle>Banner Position</DialogTitle>
    <DialogContent>
      <FormControl>
        <FormLabel>Banner Vertical Position</FormLabel>
        <RadioGroup value={bannerPosition} onChange={setBannerPosition}>
          {renderRadioButtons()}
        </RadioGroup>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeSettingsModal}>Cancel</Button>
      <Button variant="raised" color="primary" onClick={saveBannerPosition}>
        Set Position
      </Button>
    </DialogActions>
  </Dialog>
)
