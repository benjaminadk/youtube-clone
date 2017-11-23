import React from 'react'
import { LinearProgress } from 'material-ui/Progress'
import TextField from 'material-ui/TextField'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Dropzone from 'react-dropzone'

const styles = {
    CONTAINER: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        height: '100%'
    },
    GRID: {
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        backgroundColor: 'white',
        height: '70vh',
        width: '75vw',
        marginTop: '3vh'
    },
    LEFT_COLUMN: {
        display: 'flex',
        flexDirection: 'column',
        height: '70vh',
        width: '15vw'
    },
    RIGHT_COLUMN: {
        display: 'flex',
        flexDirection: 'column'
    },
    PUB_PROG_CONTAINER: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '3vh'
    },
    PROGRESS: {
        height: '4vh',
        width: '50vw',
        marginRight: '5vh'
    },
    PUBLISH: {
        height: '3vh',
        marginRight: '5vh'
    },
    THUMBNAIL: {
        flexShrink: 0,
        maxWidth: '100%',
        maxHeight: '100%'
    },
    SUB_GRID: {
        display: 'grid',
        gridTemplateColumns: '60% 40%'
    },
    SUB_LEFT: {
        display: 'flex',
        flexDirection: 'column',
        padding: '3vh'
    },
    SUB_RIGHT: {
        display: 'flex',
        flexDirection: 'column'
    },
    TEXT_INPUT: {
        marginBottom: '4vh'
    },
    PADDING_LEFT: {
        paddingLeft: '3vh',
        fontSize: '10px'
    },
    DROPZONE: {
        height: '12.5vh',
        width: '22vh',
        backgroundColor: 'lightgrey',
        margin: '3vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: '2px solid black',
        overflow: 'hidden'
    },
    POSTER_BUTTON: {
        width: '75%',
        marginLeft: '3vh'
    }
}

export default ({ 
    progress, 
    completed, 
    id, 
    description, 
    title, 
    handleVideo, 
    handleChange,
    handleUpload,
    onDrop,
    poster,
    posterFile
}) => (
    <div style={styles.CONTAINER}>
        <div style={styles.GRID}>
            <div style={styles.LEFT_COLUMN}>
                <Dropzone
                    style={styles.DROPZONE}
                    accept='image/jpeg, image/png'
                    multiple={false}
                    onDrop={onDrop}
                >
                {!posterFile && <Typography>Click To Add Poster</Typography>}
                {poster && <img src={poster} alt='thumbnail' style={styles.THUMBNAIL}/>}
                </Dropzone>
                {posterFile && <Button 
                    style={styles.POSTER_BUTTON}
                    raised 
                    dense
                    color='primary'
                    onClick={handleUpload}
                    >
                        Upload Poster
                    </Button>}
                <div style={styles.PADDING_LEFT}>
                    <p>Upload Status: </p>
                    <p>{progress === 100 ? 'Upload Complete!' : progress > 0 ? `Upload ${progress}% Complete` : null}</p>
                    {completed && <Link to={`/video/${id}`}>Watch Your Video</Link>}
                </div>
            </div>
            <div style={styles.RIGHT_COLUMN}>
                <div style={styles.PUB_PROG_CONTAINER}>
                    <LinearProgress 
                        mode='determinate'
                        value={progress}
                        style={styles.PROGRESS}
                    />
                    <Button 
                        style={styles.PUBLISH}
                        color='primary'
                        raised
                        onClick={handleVideo}
                        disabled={progress < 100}
                    >
                        Publish
                    </Button>
                </div>
                <div style={styles.SUB_GRID}>
                    <div style={styles.SUB_LEFT}>
                        <TextField 
                            label='Title'
                            value={title}
                            name='title'
                            onChange={handleChange}
                            fullWidth
                            style={styles.TEXT_INPUT}
                        />
                        <TextField
                            label='Description'
                            value={description}
                            name='description'
                            onChange={handleChange}
                            fullWidth
                            multiline={true}
                            rows={4}
                            style={styles.TEXT_INPUT}
                        />
                    </div>
                    <div style={styles.SUB_RIGHT}>

                    </div>
                </div>
            </div>
        </div>
    </div>
    )