import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import PublicIcon from '@material-ui/icons/Public'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
  popover: {
    width: '25vw',
    maxHeight: '75vh'
  },
  search: {
    width: '21vw',
    margin: '3vh 2vw 0 2vw',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
  },
  input2: {
    color: theme.palette.text.primary
  },
  listOverflow: {
    overflowY: 'auto',
    maxHeight: '40vh'
  },
  denseList: {
    paddingTop: '0',
    paddingBottom: '0',
    marginTop: '0',
    marginBottom: '0'
  },
  createButton: {
    width: '25vw',
    color: '#2793e6'
  },
  textField: {
    marginLeft: '1vw',
    marginRight: '1vw',
    marginTop: '2vh',
    width: '23vw',
    color: theme.palette.text.primary
  },
  helperText: {
    marginLeft: '2vw'
  }
})

const UploadPopover = props => {
  const { classes } = props
  return (
    <Popover
      open={props.popoverOpen}
      anchorEl={props.anchorEl}
      onClose={props.handleClosePopover}
    >
      <div className={classes.popover}>
        <FormControl className={classes.search}>
          <Input
            onChange={props.handleSearchText}
            onKeyUp={props.handleSearch}
            value={props.searchText}
            className={classes.input2}
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            }
          />
        </FormControl>
        <List dense className={classes.listOverflow}>
          {props.playlists &&
            props.playlists.map((p, i) => {
              return (
                <ListItem
                  key={`playlist-item-${i}`}
                  className={classes.denseList}
                >
                  <Checkbox
                    checked={props.state[`checkbox-${i}`]}
                    onChange={() => props.handleCheckbox(i, p.title)}
                  />
                  <ListItemText
                    primary={
                      p.title.length > 30
                        ? `${p.title.slice(0, 29)}...`
                        : p.title
                    }
                  />
                  <PublicIcon color="action" />
                </ListItem>
              )
            })}
        </List>
        <Divider />
        {props.collapsed && (
          <Button onClick={props.handleCollapse} className={classes.plusButton}>
            Create new playlist
          </Button>
        )}
        {!props.collapsed && (
          <div>
            {props.processing && <LinearProgress />}
            <FormControl>
              <Input
                placeholder="Enter playlist name..."
                label="Name"
                value={props.newPlaylistTitle}
                onChange={props.handleNewPlaylistTitle}
                className={classes.textField}
              />
              <FormHelperText className={classes.helperText}>
                {`${props.newPlaylistTitle.length}/150`}
              </FormHelperText>
            </FormControl>
            <br />
            <Button
              onClick={props.handleCreatePlaylist}
              className={classes.createButton}
            >
              Create
            </Button>
          </div>
        )}
      </div>
    </Popover>
  )
}

export default withStyles(styles)(UploadPopover)
