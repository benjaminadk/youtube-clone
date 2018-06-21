import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import SearchIcon from '@material-ui/icons/Search'

const styles = {
  UPPER: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  LEFT: {
    display: 'flex'
  },
  LEFT_2: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '4vh'
  },
  AVATAR: {
    height: '12vh',
    width: '12vh',
    margin: '2vh 3vh 2vh 10vh'
  },
  RIGHT: {
    marginRight: '10vh'
  },
  BUTTON: {
    marginLeft: '3vh'
  },
  LABEL: {
    fontSize: '.95rem'
  },
  SEARCH: {
    alignItems: 'flex-end',
    marginBottom: '1vh',
    color: '#FFFFFF'
  }
}

const labels = [
  'Home',
  'Videos',
  'Playlists',
  'Channels',
  'Discussion',
  'About'
]
const TabLabels = () => {
  return labels.map((l, i) => {
    return (
      <Tab key={`tab-${i}`} label={<span style={styles.LABEL}>{l}</span>} />
    )
  })
}

export default ({
  tabIndex,
  handleTabs,
  imageUrl,
  username,
  openSettingsModal,
  searchMode,
  searchString,
  handleSearchMode,
  handleSearchString,
  handleKeyUp
}) => (
  <AppBar position="static">
    <div style={styles.UPPER}>
      <div style={styles.LEFT}>
        <Avatar src={imageUrl} style={styles.AVATAR} />
        <div style={styles.LEFT_2}>
          <Typography color="inherit" variant="headline">
            {username}
          </Typography>
          <Typography variant="body2" color="inherit">
            200 Subscribers
          </Typography>
        </div>
      </div>
      <div style={styles.RIGHT}>
        <Button variant="raised" color="secondary">
          Customize Channel
        </Button>
        <Button style={styles.BUTTON} variant="raised" color="secondary">
          Creator Studio
        </Button>
        <IconButton color="inherit" onClick={openSettingsModal}>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
    <div style={styles.LEFT}>
      <Tabs value={tabIndex} onChange={handleTabs}>
        {TabLabels()}
        <Tab style={{ display: 'none' }} />
      </Tabs>
      <IconButton onClick={handleSearchMode} color="inherit">
        <SearchIcon />
      </IconButton>
      {searchMode && (
        <Input
          style={styles.SEARCH}
          placeholder="Search"
          value={searchString}
          onChange={handleSearchString}
          onKeyUp={handleKeyUp}
        />
      )}
    </div>
  </AppBar>
)
