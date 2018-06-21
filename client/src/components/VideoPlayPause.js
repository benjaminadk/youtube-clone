import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Transition } from 'react-transition-group'
import PauseIcon from '@material-ui/icons/PauseCircleFilled'
import PlayIcon from '@material-ui/icons/PlayCircleFilled'

const styles = theme => ({
  playPause: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '50%',
    border: '5px solid black'
  }
})
const duration = 500
const playPauseDefaultStyle = {
  position: 'absolute',
  top: '50vh',
  left: '30vw',
  transform: 'scale(2.0)',
  opacity: '0',
  transition: `all ${duration}ms ease-in-out`
}

const playPauseTransitionStyles = {
  entering: { opacity: 0.5, transform: 'scale(2.0)' },
  entered: { opacity: 0.5, transform: 'scale(4.0)' },
  exiting: { opacity: 0, transform: 'scale(4.0)' },
  exited: { opacity: 0, transform: 'scale(2.0)' }
}

const PlayPause = ({ in: inProp, playIcon, classes }) => (
  <Transition in={inProp} timeout={duration}>
    {status => (
      <div
        style={{
          ...playPauseDefaultStyle,
          ...playPauseTransitionStyles[status]
        }}
      >
        {playIcon ? (
          <PlayIcon className={classes.playPause} />
        ) : (
          <PauseIcon className={classes.playPause} />
        )}
      </div>
    )}
  </Transition>
)

export default withStyles(styles)(PlayPause)
