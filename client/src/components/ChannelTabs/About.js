import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import { formatDate } from '../../utils/formatDate'

const styles = theme => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '60% 30%',
    gridColumnGap: '10%',
    paddingLeft: '1vw',
    paddingRight: '1vw'
  },
  header: {
    marginBottom: '2vh',
    marginTop: '2vh'
  },
  divider: {
    marginTop: '2vh'
  },
  content: {
    marginLeft: '5vh'
  },
  link: {
    marginLeft: '5vh',
    fontFamily: 'Roboto',
    color: theme.palette.secondary.main
  }
})

const About = ({
  about,
  email,
  country,
  links,
  openAboutModal,
  totalViews,
  createdOn,
  classes
}) => (
  <div className={classes.grid}>
    <div>
      <Typography variant="title" className={classes.header}>
        Description
      </Typography>
      {about && <Typography className={classes.content}>{about}</Typography>}
      <Divider className={classes.divider} />
      <Typography variant="title" className={classes.header}>
        Details
      </Typography>
      <Typography varaint="caption" className={classes.content}>
        For business inquiries:{' '}
        {email && (
          <a href={`mailto:${email}`} className={classes.link}>
            {email}
          </a>
        )}
      </Typography>
      <Typography variant="caption" className={classes.content}>
        Country: {country && country}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="title" className={classes.header}>
        Links
      </Typography>
      {links.map((l, i) => (
        <a key={`link-${i}`} href={l} target="_blank" className={classes.link}>
          {l}
        </a>
      ))}
      <Divider className={classes.divider} />
      <div>
        <IconButton onClick={openAboutModal}>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
    <div>
      <Typography variant="title" className={classes.header}>
        Stats
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="title" className={classes.header}>
        Joined {formatDate(createdOn)}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="title" className={classes.header}>
        Views {totalViews}
      </Typography>
      <Divider className={classes.divider} />
    </div>
  </div>
)

export default withStyles(styles)(About)
