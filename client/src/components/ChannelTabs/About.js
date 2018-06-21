import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import { formatDate } from '../../utils'

const styles = {
  GRID: {
    display: 'grid',
    gridTemplateColumns: '60% 30%',
    gridColumnGap: '10%'
  },
  HEADER: {
    marginBottom: '2vh',
    marginTop: '2vh'
  },
  DIVIDER: {
    marginTop: '2vh'
  },
  CONTENT: {
    marginLeft: '5vh'
  }
}

export default ({
  about,
  email,
  country,
  links,
  openAboutModal,
  totalViews,
  createdOn,
  isOwner
}) => (
  <div style={styles.GRID}>
    <div>
      <Typography variant="title" style={styles.HEADER}>
        Description
      </Typography>
      {about && <Typography style={styles.CONTENT}>{about}</Typography>}
      <Divider style={styles.DIVIDER} />
      <Typography variant="title" style={styles.HEADER}>
        Details
      </Typography>
      <Typography varaint="caption" style={styles.CONTENT}>
        For business inquiries:{' '}
        {email && <a href={`mailto:${email}`}>{email}</a>}
      </Typography>
      <Typography variant="caption" style={styles.CONTENT}>
        Country: {country && country}
      </Typography>
      <Divider style={styles.DIVIDER} />
      <Typography variant="title" style={styles.HEADER}>
        Links
      </Typography>
      {links.map((l, i) => (
        <a key={`link-${i}`} href={l} target="_blank" style={styles.CONTENT}>
          {l}
        </a>
      ))}
      <Divider style={styles.DIVIDER} />
      {isOwner && (
        <div>
          <IconButton onClick={openAboutModal}>
            <SettingsIcon />
          </IconButton>
        </div>
      )}
    </div>
    <div>
      <Typography variant="title" style={styles.HEADER}>
        Stats
      </Typography>
      <Divider style={styles.DIVIDER} />
      <Typography variant="title" style={styles.HEADER}>
        Joined {formatDate(createdOn)}
      </Typography>
      <Divider style={styles.DIVIDER} />
      <Typography variant="title" style={styles.HEADER}>
        Views {totalViews}
      </Typography>
      <Divider style={styles.DIVIDER} />
    </div>
  </div>
)
