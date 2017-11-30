import React from 'react'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'

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
    <Dialog
        open={open}
        onRequestClose={closeAboutModal}
        fullWidth
    >
        <DialogTitle>About Your Channel</DialogTitle>
        <DialogContent>
            <TextField
                style={styles.INPUT}
                name='aboutForm'
                value={about}
                onChange={onChange}
                label='Description'
                fullWidth
                helperText='Enter a Description for your Channel'
                multiline
            />
            <FormControl style={styles.INPUT}>
                <InputLabel>Country</InputLabel>
                <Select
                    name='countryForm'
                    value={country}
                    onChange={onChangeCountry}
                    input={<Input/>}
                >
                    { countries.map((c,i) => (<MenuItem key={`country-${i}`} value={c}>{c}</MenuItem>))}
                </Select>
                <FormHelperText>Where are you from?</FormHelperText>
            </FormControl>
            <br/>
            <TextField
                style={styles.INPUT}
                name='linksForm'
                value={links}
                onChange={onChange}
                label='Social Media Links'
                fullWidth
                helperText='List your Social Media Links seperated by commas'
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={closeAboutModal}>Cancel</Button>
            <Button 
                onClick={saveAboutForm}
                raised
                color='primary'
            >
                Save
            </Button>
        </DialogActions>
    </Dialog>
    )