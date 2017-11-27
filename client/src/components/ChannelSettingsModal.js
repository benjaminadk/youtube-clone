import React from 'react'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const positions = [
    { value: '0%', label: 'Top' },
    { value: '25%', label: 'Mid-Top' },
    { value: '50%', label: 'Middle' },
    { value: '75%', label: 'Mid-Bottom' },
    { value: '100%', label: 'Bottom' }
    ]

const renderRadioButtons = () => positions.map((p,i) => (
    <FormControlLabel key={i} value={p.value} control={<Radio/>} label={p.label}/>
    ))

export default ({ open, closeSettingsModal, bannerPosition, setBannerPosition, saveBannerPosition }) => (
    <Dialog
        open={open}
        onRequestClose={closeSettingsModal}
        fullWidth
    >
        <DialogTitle>Banner Position</DialogTitle>
        <DialogContent>
            <FormControl>
                <FormLabel>Banner Vertical Position</FormLabel>
                <RadioGroup
                    value={bannerPosition}
                    onChange={setBannerPosition}
                >
                    {renderRadioButtons()}
                </RadioGroup>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeSettingsModal}>Cancel</Button>
            <Button
                raised
                color='primary'
                onClick={saveBannerPosition}
            >
                Set Position
            </Button>
        </DialogActions>
    </Dialog>
    )