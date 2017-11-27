import React from 'react'
import { Link } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import SortIcon from 'material-ui-icons/Sort'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { timeDifferenceForDate } from '../../utils'

const styles = {
    TOP_ROW: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '3vh 10vh'
    },
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
    if(description.length < 200) return description
    return description.slice(0,195) + '...'
}

export default ({ 
    videos, 
    sortMenu, 
    handleOpenSortMenu, 
    handleCloseSortMenu,
    handleSortBy,
    sortBy,
    handleVideoList,
    videoList
}) => (
    <div>
        <div style={styles.TOP_ROW}>
            <FormControl>
                <Select
                    value={videoList}
                    onChange={handleVideoList}
                >
                <MenuItem value='upload'>Uploads</MenuItem>
                <MenuItem value='liked'>Liked Videos</MenuItem>
                <MenuItem value='all'>All Videos</MenuItem>
                </Select>
            </FormControl>
            <Button id='sort' onClick={handleOpenSortMenu}><SortIcon/>&nbsp; Sort By</Button>
            <Menu
                open={sortMenu}
                anchorEl={document.getElementById('sort')}
                onRequestClose={handleCloseSortMenu}
            >
                <MenuItem onClick={() => handleSortBy('popular')}>Most Popular</MenuItem>
                <MenuItem onClick={() => handleSortBy('oldest')}>Date Added(oldest)</MenuItem>
                <MenuItem onClick={() => handleSortBy('newest')}>Date Added(newest)</MenuItem>
            </Menu>
        </div>
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