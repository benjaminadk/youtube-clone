import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ThumbsUpIcon from '@material-ui/icons/ThumbUp'
import ThumbsDownIcon from '@material-ui/icons/ThumbDown'
import ReplyIcon from '@material-ui/icons/Reply'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Input from '@material-ui/core/Input'
import { timeDifferenceForDate } from '../utils'
import { Link } from 'react-router-dom'
import PlayPause from './VideoPlayPause'

const styles = theme => ({
  video: {
    height: '75vh',
    marginLeft: '3vh'
  },
  videoStats: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  views: {
    marginTop: '2vh',
    marginLeft: '1vw'
  },
  spacer: {
    marginRight: '3vh'
  },
  videoInfo: {
    display: 'grid',
    gridTemplateColumns: '10% 70% 20%',
    marginTop: '3vh',
    marginBottom: '3vh',
    marginLeft: '1vw'
  },
  avatar: {
    height: '8vh',
    width: '8vh'
  },
  subButton: {
    color: '#FFFFFF',
    height: '6.5vh',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '2vh',
    marginLeft: '1vw'
  },
  input: {
    fontSize: '13px',
    color: theme.palette.text.primary
  },
  commentBlock: {
    marginBottom: '5vh',
    marginLeft: '1.5vw'
  },
  commentButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '3vh',
    marginTop: '1vh'
  },
  submitCommentButton: {
    color: theme.palette.text.primary
  },
  commentInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  commentFlexCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  replyButton: {
    marginLeft: '7vh'
  },
  smallAvatar: {
    height: '4vh',
    width: '4vh',
    marginRight: '3vh'
  },
  subCommentBlock: {
    marginLeft: '10vh'
  },
  link: {
    textDecoration: 'none'
  }
})

const VideoMain = ({
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
  playIcon,
  classes
}) => (
  <div>
    <PlayPause in={!!showPlayPause} playIcon={playIcon} />
    <video
      src={url}
      controls
      className={classes.video}
      poster={poster}
      ref={videoRef}
      onClick={handleVideoClick}
    />
    <Typography variant="headline" style={{ marginLeft: '1vw' }}>
      {title}
    </Typography>
    <div className={classes.videoStats}>
      <div>
        <Typography variant="subheading" className={classes.views}>
          {views} views
        </Typography>
      </div>
      <div>
        <IconButton className={classes.spacer} onClick={handleThumbsLike}>
          <ThumbsUpIcon />&nbsp;
          <Typography variant="button">{likes}</Typography>
        </IconButton>
        <IconButton className={classes.spacer} onClick={handleThumbsDislike}>
          <ThumbsDownIcon />&nbsp;
          <Typography variant="button">{dislikes}</Typography>
        </IconButton>
        <Button
          className={classes.spacer}
          onClick={handleShareModalOpen}
          disableRipple
        >
          <ReplyIcon /> Share
        </Button>
      </div>
    </div>
    <Divider />
    <div className={classes.videoInfo}>
      <Link to={`/channel/${id}`}>
        <Avatar src={imageUrl} alt="user" className={classes.avatar} />
      </Link>
      <div>
        <Link to={`/channel/${id}`} className={classes.link}>
          <Typography variant="title">{username}</Typography>
        </Link>
        <Typography>Published {timeDifferenceForDate(createdOn)}</Typography>
        <br />
        <br />
        <Typography>{description}</Typography>
      </div>
      <Button variant="raised" color="secondary" className={classes.subButton}>
        Subscribe 123
      </Button>
    </div>
    <Divider />
    <div className={classes.flexRow}>
      <Typography variant="subheading">{comments.length} Comments</Typography>
      <Button>Sort By</Button>
    </div>
    <div className={classes.flexRow}>
      <Avatar
        className={classes.spacer}
        src={localStorage.getItem('AVATAR')}
        alt="user"
      />
      <Input
        fullWidth
        value={comment}
        onChange={handleCommentText}
        placeholder="Add a public comment..."
        className={classes.input}
      />
    </div>
    <div className={classes.commentButtons}>
      <Button variant="flat" disableRipple onClick={resetComment}>
        Cancel
      </Button>
      <Button
        disabled={!comment}
        variant="raised"
        onClick={createNewComment}
        className={classes.submitCommentButton}
        style={{ backgroundColor: comment ? '#2793e6' : '#162B3C' }}
      >
        Comment
      </Button>
    </div>
    <div>
      {comments &&
        comments.map((c, i) => {
          return (
            <div key={`video-comment-${i}`} className={classes.commentBlock}>
              <div className={classes.commentInfo}>
                <Avatar src={c.postedBy.imageUrl} className={classes.spacer} />
                <div className={classes.commentFlexCol}>
                  <div className={classes.commentInfo}>
                    <Typography variant="body2">
                      {c.postedBy.username}
                    </Typography>&nbsp;&nbsp;
                    <Typography variant="caption">
                      {timeDifferenceForDate(c.postedOn)}
                    </Typography>
                  </div>
                  <Typography>{c.text}</Typography>
                </div>
              </div>
              <div className={classes.commentInfo}>
                <Button
                  className={classes.replyButton}
                  onClick={() => handleReply(i)}
                >
                  Reply
                </Button>
                <Typography variant="body2">{c.likes}</Typography>
                <IconButton>
                  <ThumbsUpIcon />
                </IconButton>
                <IconButton>
                  <ThumbsDownIcon />
                </IconButton>
              </div>
              {visibleInput === i ? (
                <div>
                  <div className={classes.commentInfo}>
                    <Avatar src={imageUrl} className={classes.smallAvatar} />
                    <Input
                      fullWidth
                      value={subComment}
                      onChange={handleSubCommentText}
                      placeholder="Add a public reply..."
                      className={classes.input}
                      name={i}
                    />
                  </div>
                  <div className={classes.commentButtons}>
                    <Button onClick={resetSubComment}>Cancel</Button>
                    <Button
                      disabled={!subComment}
                      variant="raised"
                      color="primary"
                      onClick={() => createNewSubComment(c.id)}
                      style={{
                        backgroundColor: subComment ? '#2793e6' : '#162B3C'
                      }}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              ) : null}
              {c.subComments &&
                c.subComments.map((sc, index) => {
                  return (
                    <div
                      key={`video-sub-comment-${i}-${index}`}
                      className={classes.subCommentBlock}
                    >
                      <div className={classes.flexRow}>
                        <Avatar
                          src={sc.postedBy.imageUrl}
                          className={classes.smallAvatar}
                        />
                        <div className={classes.commentFlexCol}>
                          <div className={classes.commentInfo}>
                            <Typography variant="body2">
                              {sc.postedBy.username}
                            </Typography>&nbsp;&nbsp;
                            <Typography variant="caption">
                              {timeDifferenceForDate(sc.postedOn)}
                            </Typography>
                          </div>
                          <Typography>{sc.text}</Typography>
                        </div>
                      </div>
                      <div className={classes.commentInfo}>
                        <Typography variant="body2">{sc.likes}</Typography>
                        <IconButton>
                          <ThumbsUpIcon />
                        </IconButton>
                        <IconButton>
                          <ThumbsDownIcon />
                        </IconButton>
                      </div>
                    </div>
                  )
                })}
            </div>
          )
        })}
    </div>
  </div>
)

export default withStyles(styles)(VideoMain)
