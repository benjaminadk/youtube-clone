import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SortIcon from '@material-ui/icons/Sort'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { timeDifferenceForDate } from '../../utils'

const styles = theme => ({
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '3vh 10vh'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '20% 50% 30%'
  },
  poster: {
    margin: '1.5vh',
    height: '18vh',
    width: '35vh'
  },
  videoInfo: {
    marginTop: '3vh'
  },
  menuItem: {
    color: theme.palette.text.primary
  }
})

const renderDescription = description => {
  if (description.length < 200) return description
  return description.slice(0, 195) + '...'
}

const Videos = ({
  videos,
  sortMenu,
  handleOpenSortMenu,
  handleCloseSortMenu,
  handleSortBy,
  sortBy,
  handleVideoList,
  videoList,
  classes
}) => (
  <div>
    <div className={classes.topRow}>
      <FormControl>
        <Select
          value={videoList}
          onChange={handleVideoList}
          className={classes.menuItem}
        >
          <MenuItem value="upload">Uploads</MenuItem>
          <MenuItem value="liked">Liked Videos</MenuItem>
          <MenuItem value="all">All Videos</MenuItem>
        </Select>
      </FormControl>
      <Button id="sort" onClick={handleOpenSortMenu}>
        <SortIcon />&nbsp; Sort By
      </Button>
      <Menu
        open={sortMenu}
        anchorEl={document.getElementById('sort')}
        onClose={handleCloseSortMenu}
      >
        <MenuItem onClick={() => handleSortBy('popular')}>
          Most Popular
        </MenuItem>
        <MenuItem onClick={() => handleSortBy('oldest')}>
          Date Added(oldest)
        </MenuItem>
        <MenuItem onClick={() => handleSortBy('newest')}>
          Date Added(newest)
        </MenuItem>
      </Menu>
    </div>
    {videos &&
      videos.map((v, i) => {
        return (
          <div key={`video-${i}`}>
            <div className={classes.grid}>
              <Link to={`/video/${v.id}`}>
                <img
                  src={v.poster || 'http://via.placeholder.com/200x125'}
                  alt="poster"
                  className={classes.poster}
                />
              </Link>
              <div className={classes.videoInfo}>
                <Typography variant="title">{v.title}</Typography>
                <Typography variant="body2">
                  {v.views} views &bull; {timeDifferenceForDate(v.createdOn)}
                </Typography>
                <Typography variant="body2">
                  {renderDescription(v.description)}
                </Typography>
              </div>
              <div />
            </div>
            <Divider />
          </div>
        )
      })}
  </div>
)

export default withStyles(styles)(Videos)
