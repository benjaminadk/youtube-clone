import React from 'react'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ThumbsUpIcon from 'material-ui-icons/ThumbUp'
import ThumbsDownIcon from 'material-ui-icons/ThumbDown'
import ReplyIcon from 'material-ui-icons/Reply'
import PauseIcon from 'material-ui-icons/PauseCircleFilled'
import PlayIcon from 'material-ui-icons/PlayCircleFilled'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import Input from 'material-ui/Input'
import { timeDifferenceForDate } from '../utils'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group'

const styles = {
    VIDEO: {
        height: '75vh',
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
    COMMENT_BLOCK: {
        marginBottom: '5vh'
    },
    COMMENT_BUTTONS: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '3vh',
        marginTop: '1vh'
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
    },
    SMALL_AVATAR: {
        height: '4vh',
        width: '4vh',
        marginRight: '3vh'
    },
    SUB_COMMENT_BLOCK: {
        marginLeft: '10vh'
    },
    LINK: {
        textDecoration: 'none'
    },
    PLAY_PAUSE: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '50%'
    }
}

const duration = 500

const playPauseDefaultStyle = {
    position: 'absolute',
    top: '50vh',
    left: '30vw',
    transform: 'scale(2.0)',
    opacity: '0',
    transition: `all ${duration}ms ease-in-out`
}

const playPauseTransitionStyles = {
    entering: { opacity: .5, transform: 'scale(2.0)' },
    entered: { opacity: .5, transform: 'scale(4.0)' },
    exiting: { opacity: 0, transform: 'scale(4.0)' },
    exited: { opacity: 0, transform: 'scale(2.0)' }
}

const PlayPause = ({ in: inProp, playIcon }) => (
    <Transition in={inProp} timeout={duration}>
    {(status) => (
        <div style={{
            ...playPauseDefaultStyle,
            ...playPauseTransitionStyles[status]
        }}>
           {playIcon ? <PlayIcon style={styles.PLAY_PAUSE}/> : <PauseIcon style={styles.PLAY_PAUSE}/>}
        </div>
    )}
    </Transition>
    )

export default ({ 
    videoRef,
    handleVideoClick,
    id,
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
    comments,
    subComment,
    handleSubCommentText,
    handleReply,
    visibleInput,
    resetSubComment,
    createNewSubComment,
    showPlayPause,
    playIcon
}) => (
     <div>
        <PlayPause in={!!showPlayPause} playIcon={playIcon}/>
        <video
            src={url} 
            controls 
            style={styles.VIDEO}
            poster={poster}
            ref={videoRef}
            onClick={handleVideoClick}
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
                <Link to={`/channel/${id}`}>
                    <Avatar src={imageUrl} alt='user' style={styles.AVATAR}/>
                </Link>
                <div>
                    <Link to={`/channel/${id}`} style={styles.LINK}>
                        <Typography type='title'>{username}</Typography>
                    </Link>
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
                <div key={`video-comment-${i}`} style={styles.COMMENT_BLOCK}>
                    <div style={styles.COMMENT_INFO}>
                        <Avatar src={c.postedBy.imageUrl} style={styles.SPACER}/>
                        <div style={styles.COMMENT_FLEX_COL}>
                            <div style={styles.COMMENT_INFO}>
                                <Typography type='body2'>{c.postedBy.username}</Typography>&nbsp;&nbsp;
                                <Typography type='caption'>{timeDifferenceForDate(c.postedOn)}</Typography>
                            </div>
                            <Typography>{c.text}</Typography>
                        </div>
                    </div>
                    <div style={styles.COMMENT_INFO}>
                        <Button 
                            dense 
                            style={styles.REPLY_BUTTON}
                            onClick={() => handleReply(i)}
                        >
                            Reply
                        </Button>
                        <Typography type='body2'>{c.likes}</Typography>
                        <IconButton><ThumbsUpIcon/></IconButton>
                        <IconButton><ThumbsDownIcon/></IconButton>
                    </div>
                    {visibleInput === i ? <div>
                        <div style={styles.COMMENT_INFO}>
                            <Avatar src={imageUrl} style={styles.SMALL_AVATAR}/>
                            <Input 
                                fullWidth
                                value={subComment}
                                onChange={handleSubCommentText}
                                placeholder='Add a public reply...'
                                style={styles.INPUT}
                                name={i}
                            />
                        </div>
                        <div style={styles.COMMENT_BUTTONS}>
                            <Button onClick={resetSubComment}>Cancel</Button>
                            <Button
                                disabled={!subComment}
                                raised
                                dense
                                color='primary'
                                onClick={() => createNewSubComment(c.id)}
                            >
                                Reply
                            </Button>
                        </div>
                    </div> : null}
                    {c.subComments && c.subComments.map((sc,index) => {
                        return(
                            <div key={`video-sub-comment-${i}-${index}`} style={styles.SUB_COMMENT_BLOCK}>
                                <div style={styles.FLEX_ROW}>
                                    <Avatar src={sc.postedBy.imageUrl} style={styles.SMALL_AVATAR}/>
                                    <div style={styles.COMMENT_FLEX_COL}>
                                        <div style={styles.COMMENT_INFO}>
                                            <Typography type='body2'>{sc.postedBy.username}</Typography>&nbsp;&nbsp;
                                            <Typography type='caption'>{timeDifferenceForDate(sc.postedOn)}</Typography>
                                        </div>
                                        <Typography>{sc.text}</Typography>
                                    </div>
                                </div>
                                <div style={styles.COMMENT_INFO}>
                                    <Typography type='body2'>{sc.likes}</Typography>
                                    <IconButton><ThumbsUpIcon/></IconButton>
                                    <IconButton><ThumbsDownIcon/></IconButton>
                                </div>
                            </div>
                        )
                    }) }
                </div>
            )   
        })}
        </div>
    </div>
    )
               