import React from 'react'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

const styles = {
    UPPER: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    LEFT: {
        display: 'flex'
    },
    LEFT_2: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '4vh'
    },
    AVATAR: {
        height: '12vh',
        width: '12vh',
        margin: '2vh 3vh 2vh 10vh'
    },
    RIGHT: {
        marginRight: '10vh'
    },
    BUTTON: {
        marginLeft: '3vh'
    },
    LABEL: {
        fontSize: '.95rem'
    }
}

const labels = ['Home','Videos','Playlists','Channels','Discussion','About']
const TabLabels = () => {
    return labels.map((l,i) => {
        return (<Tab key={`tab-${i}`} label={<span style={styles.LABEL}>{l}</span>}/>)
    })
}

export default ({ tabIndex, handleTabs, imageUrl, username }) => (
    <AppBar position='static'>
        <div style={styles.UPPER}>
            <div style={styles.LEFT}>
                <Avatar src={imageUrl} style={styles.AVATAR}/>
                <div style={styles.LEFT_2}>
                    <Typography color='inherit' type='headline'>{username}</Typography>
                    <Typography color='inherit'>200 Subscribers</Typography>
                </div>
            </div>
            <div style={styles.RIGHT}>
                <Button raised color='accent'>Customize Channel</Button>
                <Button style={styles.BUTTON} raised color='accent'>Creator Studio</Button>
            </div>
        </div>
        <Tabs value={tabIndex} onChange={handleTabs}>
            {TabLabels()}    
        </Tabs>
    </AppBar>
    )