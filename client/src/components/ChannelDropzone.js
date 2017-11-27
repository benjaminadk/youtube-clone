import React from 'react'
import Dropzone from 'react-dropzone'

const styles = {
    DROPZONE: {
        width: '100vw',
        height: '33vh',
        backgroundColor: 'lightgrey',
        cursor: 'pointer',
        overflow: 'hidden'
    }
}

export default ({ onDrop, file, bannerUrl, bannerPosition }) => {
    return(
        <Dropzone
            id='dropzone'
            style={styles.DROPZONE}
            accept='image/jpeg, image/png'
            onDrop={onDrop}
            multiple={false}
        >
        { bannerUrl && <div 
                            style={{
                            backgroundImage: `url('${bannerUrl}')`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: `50% ${bannerPosition || '50%'}`, 
                            height: '33vh'}}
                        ></div>}
        </Dropzone>
        )
}