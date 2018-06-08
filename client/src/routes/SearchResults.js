import React from 'react'
import { Link } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import { timeDifferenceForDate, formatTime } from '../utils'
import '../styles/VideoList.css'

const styles = {
    CONTAINER: {
        marginTop: '5vh'
    },
    VIDEO_ITEM: {
        marginTop: '2vh',
        marginBottom: '2vh',
        display: 'flex'
    },
    LINK: {
        textDecoration: 'none'
    },
    POSTER: {
        height: '18vh',
        width: '35vh',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    },
    DURATION: {
        fontFamily: 'Roboto',
        fontSize: '.70rem',
        paddingLeft: '2px',
        paddingRight: '2px',
        borderRadius: '2px',
        color: 'white',
        backgroundColor: '#000000BF',  
        position: 'relative',
        top: '14.5vh',
        left: '26vh'
    },
    DATA_COLUMN: {
        display: 'flex',
        flexDirection: 'column',
        width: '60vw'
    },
    DATA_ROW: {
        display: 'flex'
    }
}

export default ({ videos }) => (
    <div style={styles.CONTAINER}>
        <Typography type='title'>About {videos.length} results</Typography>
        <Divider/>
        {videos && videos.map((v,i) => {
            return(
                <div 
                    key={`video-${i}`} 
                    style={styles.VIDEO_ITEM}
                    className='video-list-item'
                    >
                    <Link to={`/video/${v.id}`} style={styles.LINK}>
                        <div style={Object.assign({}, styles.POSTER, { backgroundImage: `url(${v.poster})`})}>
                            {v.duration > 0 && <span style={styles.DURATION}>{formatTime(v.duration)}</span>}
                        </div>
                    </Link>
                    <div style={styles.DATA_COLUMN}>
                        <Typography type='title'>{v.title}</Typography>
                        <div style={styles.DATA_ROW}>
                            <Typography type='caption'>
                                {v.owner.username} &bull; {v.views} views &bull; {timeDifferenceForDate(v.createdOn)}
                            </Typography>
                        </div>
                        <br/>
                        <Typography>{v.description}</Typography>
                    </div>
                    <IconButton
                        className='more-vert-icon'
                    >
                        <MoreVertIcon/>
                    </IconButton>
                </div> 
            )
        })}
    </div>
    )