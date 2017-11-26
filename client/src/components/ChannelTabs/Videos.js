import React from 'react'
import { Link } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import { timeDifferenceForDate } from '../../utils'

const styles = {
    GRID: {
        display: 'grid',
        gridTemplateColumns: '20% 50% 30%'
    },
    POSTER: {
        margin: '1.5vh'
    },
    VIDEO_INFO: {
        marginTop: '3vh'
    }
}

const renderDescription = description => {
    if(description.length < 200) return description
    return description.slice(0,195) + '...'
}

export default ({ videos }) => (
    <div>
        { videos && videos.map((v,i) => {
           return(
               <div key={`video-${i}`}>
                    <div style={styles.GRID}>
                        <Link to={`/video/${v.id}`}>
                            <img 
                                src={v.poster || 'http://via.placeholder.com/200x125'} 
                                alt='poster'
                                style={styles.POSTER}
                            />
                        </Link>
                        <div style={styles.VIDEO_INFO}>
                            <Typography type='title'>{v.title}</Typography>
                            <Typography>{v.views} views &bull; {timeDifferenceForDate(v.createdOn)}</Typography>
                            <Typography>{renderDescription(v.description)}</Typography>
                        </div>
                        <div>
                        </div>
                    </div>
                    <Divider/>
                </div>
            ) 
        })}
    </div>
    )