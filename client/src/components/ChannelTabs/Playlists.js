import React from 'react'
import Typography from 'material-ui/Typography'
import PlaylistIcon from 'material-ui-icons/PlaylistPlay'
import SortIcon from 'material-ui-icons/Sort'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'

const styles = {
    CONTAINER: {
        display: 'flex',
        flexDirection: 'column'
    },
    TOP_ROW: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '2vh 10vh'
    },
    PLAYLIST_ROWS: {
        display: 'flex'  
    },
    POSTER: {
        margin: '1.5vh',
        height: '18vh',
        width: '32vh',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    },
    OVERLAY: {
        height: '18vh',
        width: '14vh',
        backgroundColor: '#00000060',
        color: 'white',
        textAlign: 'center',
        float: 'right'
    },
    VIEWS: {
        paddingTop: '5vh'
    },
    TITLE: {
        textAlign: 'center',
        width: '30vh',
        marginLeft: '3vh',
        marginRight: '3vh'
    }
}

export default ({ 
    playlists, 
    handleOpenSortMenuPl, 
    handleCloseSortMenuPl, 
    sortMenuPl, 
    handleSortByPl, 
    anchorElPl
}) => (
    <div style={styles.CONTAINER}>
        <div style={styles.TOP_ROW}>
            <Typography type='title'>Created Playlists</Typography>
            <div>
                <Button onClick={handleOpenSortMenuPl}><SortIcon/>&nbsp; Sort By</Button>
                <Menu
                    open={sortMenuPl}
                    anchorEl={anchorElPl}
                    onRequestClose={handleCloseSortMenuPl}
                >
                    <MenuItem onClick={() => handleSortByPl('oldest')}>Date Added(oldest)</MenuItem>
                    <MenuItem onClick={() => handleSortByPl('newest')}>Date Added(newest)</MenuItem>
                    <MenuItem onClick={() => handleSortByPl('last')}>Last Video Added</MenuItem>
                </Menu>
            </div>
        </div>
        <div style={styles.PLAYLIST_ROWS}>
        {playlists.map((p,i) => {
            return(
                <div key={`user-playlist-${i}`}>
                    <div style={Object.assign({},styles.POSTER,{ backgroundImage: `url(${p.videos[0].poster})`})}>
                        <div style={styles.OVERLAY}>
                            <p style={styles.VIEWS}>{p.videos.length}</p>
                            <PlaylistIcon/>
                        </div>
                    </div>
                    <div style={styles.TITLE}>
                        <Typography>{p.title}</Typography>
                    </div>
                </div>
            )
        })}
        </div>
    </div>
    )