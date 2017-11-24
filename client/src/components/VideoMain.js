import React from 'react'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ThumbsUpIcon from 'material-ui-icons/ThumbUp'
import ThumbsDownIcon from 'material-ui-icons/ThumbDown'
import ReplyIcon from 'material-ui-icons/Reply'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import Input from 'material-ui/Input'
import { timeDifferenceForDate } from '../utils'

const styles = {
    VIDEO: {
        height: '72vh',
        marginLeft: '3vh'
    },
    VIDEO_STATS: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    VIEWS: {
        marginTop: '2vh'
    },
    SPACER: {
        marginRight: '3vh'
    },
    VIDEO_INFO: {
        display: 'grid',
        gridTemplateColumns: '10% 70% 20%',
        marginTop: '3vh',
        marginBottom: '3vh'
    },
    AVATAR: {
        height: '8vh',
        width: '8vh'
    },
    SUB_BUTTON: {
        backgroundColor: '#FF0000',
        color: '#FFFFFF',
        height: '6.5vh'
    },
    FLEX_ROW: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '2vh'
    },
    INPUT: {
        fontSize: '13px'
    },
    COMMENT_BUTTONS: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '3vh'
    },
    COMMENT_INFO: {
        display: 'flex',
        alignItems: 'center'
    },
    COMMENT_FLEX_COL: {
        display: 'flex',
        flexDirection: 'column'
    },
    REPLY_BUTTON: {
        marginLeft: '7vh'
    }
}

export default ({ 
    videoRef,
    url,
    description,
    poster,
    title,
    views,
    likes,
    dislikes,
    username,
    createdOn,
    imageUrl,
    handleThumbsLike,
    handleThumbsDislike,
    handleShareModalOpen,
    handleCommentText,
    comment,
    resetComment,
    createNewComment,
    comments
}) => (
     <div>
        <video
            src={url} 
            controls 
            style={styles.VIDEO}
            poster={poster}
            ref={videoRef}
        />
        <Typography type='headline'>{title}</Typography>
        <div style={styles.VIDEO_STATS}>
            <div>
                <Typography type='subheading' style={styles.VIEWS}>{views} views</Typography>
            </div>
            <div>
                <IconButton style={styles.SPACER} onClick={handleThumbsLike}>
                    <ThumbsUpIcon/>&nbsp;
                    <Typography type='button'>{likes}</Typography>
                </IconButton>
                <IconButton style={styles.SPACER} onClick={handleThumbsDislike}>
                    <ThumbsDownIcon/>&nbsp;
                    <Typography type='button'>{dislikes}</Typography>
                </IconButton>
                <IconButton style={styles.SPACER}>
                    <ReplyIcon/>
                    <Typography type='button' onClick={handleShareModalOpen}>Share</Typography>
                </IconButton>
            </div>
        </div>
        <Divider/>
            <div style={styles.VIDEO_INFO}>
                <Avatar src={imageUrl} alt='user' style={styles.AVATAR}/>
                <div>
                    <Typography type='title'>{username}</Typography>
                    <Typography>Published {timeDifferenceForDate(createdOn)}</Typography>
                    <br/>
                    <br/>
                    <Typography>{description}</Typography>
                </div>
                <Button 
                    raised
                    style={styles.SUB_BUTTON}
                >
                    Subscribe 123
                </Button>
            </div>
        <Divider/>
        <div style={styles.FLEX_ROW}>
            <Typography type='subheading'>{comments.length} Comments</Typography>
            <Button>Sort By</Button>
        </div>
        <div style={styles.FLEX_ROW}>
            <Avatar style={styles.SPACER} src={imageUrl} alt='user'/>
            <Input
                fullWidth
                value={comment}
                onChange={handleCommentText}
                placeholder='Add a public comment...'
                style={styles.INPUT}
            />
        </div>
        <div style={styles.COMMENT_BUTTONS}>
            <Button onClick={resetComment}>Cancel</Button>
            <Button 
                disabled={!comment}
                raised
                color='primary'
                onClick={createNewComment}
            >
                Comment
            </Button>
        </div>
        <div>
        { comments && comments.map((c,i) => {
            return(
                <div key={`video-comment-${i}`}>
                    <div style={styles.COMMENT_INFO}>
                        <Avatar src={c.postedBy.imageUrl} style={styles.SPACER}/>
                        <div style={styles.COMMENT_FLEX_COL}>
                            <div style={styles.COMMENT_INFO}>
                                <Typography type='body2'>{c.postedBy.username}</Typography>&nbsp;&nbsp;
                                <Typography type='caption'>{timeDifferenceForDate(c.postedOn)}</Typography>
                            </div>
                            <Typography type='subheading'>{c.text}</Typography>
                        </div>
                    </div>
                    <div style={styles.COMMENT_INFO}>
                        <Button 
                            dense 
                            style={styles.REPLY_BUTTON}
                        >
                            Reply
                        </Button>
                        <Typography type='body2'>{c.likes}</Typography>
                        <IconButton><ThumbsUpIcon/></IconButton>
                        <IconButton><ThumbsDownIcon/></IconButton>
                    </div>
                </div>
            )   
        })}
        </div>
    </div>
    )
               