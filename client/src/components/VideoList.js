import React from 'react'
import Switch from 'material-ui/Switch'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import CheckIcon from 'material-ui-icons/CheckCircle'
import NewIcon from 'material-ui-icons/FiberNew'
import { Link } from 'react-router-dom'
import { setNewVideoTag, formatTime } from '../utils'

const styles = {
    CONTAINER: {
        marginLeft: '2vw',
        marginRight: '2vw'
    },
    FLEX_ROW: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    LIST_ITEM: {
        display: 'grid',
        gridTemplateColumns: '45% 55%',
        marginTop: '1vh',
        textDecoration: 'none'
    },
    POSTER: {
        width: '11.5vw',
        height: '6.5vw'
    },
    INFO: {
        display: 'flex',
        flexDirection: 'column'
    },
    UP_NEXT: {
        marginTop: '2.5vh'
    },
    CHECK: {
        transform: 'scale(.5) translatey(-1.25vh)',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    NAME_ROW: {
        display: 'flex'
    },
    DIVIDER: {
        marginTop: '2vh',
        marginBottom: '2vh'
    },
    TITLE: {
        lineHeight: '1'
    },
    NEW: {
        transform: 'translate(1vw,-1vh)',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    POSTER_WRAPPER: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    DURATION: {
        fontFamily: 'Roboto',
        fontSize: '.70rem',
        paddingLeft: '2px',
        paddingRight: '2px',
        borderRadius: '2px',
        color: 'white',
        backgroundColor: '#000000BF',
        transform: 'translate(4vw, -3vh)'
    }
}

export default ({ videoList }) => (
    <div style={styles.CONTAINER}>
        <div style={styles.FLEX_ROW}>
            <Typography type='title' style={styles.UP_NEXT}>Up Next</Typography>
            <Typography type='button'>AUTOPLAY<Switch/></Typography>
        </div>
        {videoList && videoList.map((v,i) => {
            return(
                <div key={`video-list-item-${i}`}>
                    <Link 
                        to={`/video/${v.id}`}
                        style={styles.LIST_ITEM}
                    >
                        <div style={styles.POSTER_WRAPPER}>
                            <img 
                                src={v.poster}
                                alt='poster'
                                style={styles.POSTER}
                            />
                            {v.duration > 0 ? <span style={styles.DURATION}>{formatTime(v.duration)}</span> : null}
                        </div>
                        <div style={styles.INFO}>
                            <Typography type='body2' style={styles.TITLE}>{v.title}</Typography>
                            <div style={styles.NAME_ROW}>
                                <Typography type='caption'>{v.owner.username}</Typography>
                                <CheckIcon style={styles.CHECK}/>
                            </div> 
                            <div style={styles.NAME_ROW}>
                                <Typography type='caption'>{v.views} views </Typography>
                                {setNewVideoTag(v.createdOn) ? <NewIcon style={styles.NEW}/> : null}
                            </div>
                        </div>
                    </Link>
                    {i === 0 ? <Divider style={styles.DIVIDER}/> : null}
                </div>
            )
        })}
    </div>
    )