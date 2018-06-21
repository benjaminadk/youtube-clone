import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { timeDifferenceForDate } from '../../utils'

const styles = {
  GRID: {
    display: 'grid',
    gridTemplateColumns: '20% 50% 30%'
  },
  POSTER: {
    margin: '1.5vh',
    height: '18vh',
    width: '35vh'
  },
  VIDEO_INFO: {
    marginTop: '3vh'
  }
}

const renderDescription = description => {
  if (description.length < 200) return description
  return description.slice(0, 195) + '...'
}

export default ({ filteredVideos }) => (
  <div>
    {filteredVideos &&
      filteredVideos.map((v, i) => {
        return (
          <div key={`video-${i}`}>
            <div style={styles.GRID}>
              <Link to={`/video/${v.id}`}>
                <img
                  src={v.poster || 'http://via.placeholder.com/200x125'}
                  alt="poster"
                  style={styles.POSTER}
                />
              </Link>
              <div style={styles.VIDEO_INFO}>
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
