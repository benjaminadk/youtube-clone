import React from 'react'
import Dropzone from 'react-dropzone'

const styles = {
    DROPZONE: {
        width: '100vw',
        height: '33vh',
        backgroundColor: 'lightgrey',
        cursor: 'pointer'
    }
}

export default ({ onDrop, file }) => (
    <Dropzone
        style={styles.DROPZONE}
        accept='image/jpeg, image/png'
        onDrop={onDrop}
        multiple={false}
    >
    
    </Dropzone>
    )