import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { graphql, compose } from 'react-apollo'
import ShareModal from '../components/ShareModal'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import queryString from 'query-string'
import EmbedModal from '../components/EmbedModal'
import { formatTime } from '../utils'
import IconButton from '@material-ui/core/IconButton'
import VideoMain from '../components/VideoMain'
import VideoList from '../components/VideoList'
import { USER_PLAYLIST_QUERY } from '../queries/userPlaylist'
import { VIDEO_LIST_QUERY } from '../queries/videoList'
import { ADD_TO_PLAYLIST_MUTATION } from '../mutations/addToPlaylist'
import { VIDEO_BY_ID_QUERY } from '../queries/videoById'
import { CREATE_PLAYLIST_MUTATION } from '../mutations/createPlaylist'
import { SET_DURATION_MUTATION } from '../mutations/setDuration'
import { CREATE_SUBCOMMENT_MUTATION } from '../mutations/createSubcomment'
import { CREATE_COMMENT_MUTATION } from '../mutations/createComment'
import { ADD_DISLIKE_MUTATION } from '../mutations/addDislike'
import { ADD_LIKE_MUTATION } from '../mutations/addLike'
import { ADD_VIEW_MUTATION } from '../mutations/addView'

const styles = theme => ({
  container: {
    marginTop: '3vh',
    display: 'grid',
    gridTemplateColumns: '67% 33%'
  }
})

class Video extends Component {
  state = {
    shareDialogOpen: false,
    copySnackbarOpen: false,
    embedDialogOpen: false,
    linkToShare: '',
    checked: false,
    currentTime: 0,
    currentTimeString: '0:00',
    comment: '',
    subComment: '',
    visibleInput: null,
    showPlayPause: false,
    playIcon: false,
    anchorEl: null,
    collapsed: true,
    newPlaylistTitle: ''
  }

  componentDidMount() {
    this.handleAddView()
    setTimeout(this.handleTimeQuery, 2500)
    this.setState({
      linkToShare: `http://localhost${this.props.location.pathname}`
    })
    setTimeout(this.handleSetDuration, 3000)
    setTimeout(this.createChecks, 2000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.videoId !== this.props.match.params.videoId) {
      this.handleAddView()
      setTimeout(this.handleSetDuration, 3000)
    }
  }

  createChecks = async () => {
    const videos = this.props.videoList.getVideoList
    const playlists = this.props.playlists.getUserPlaylists
    const vIds = []
    videos.forEach(v => vIds.push(v.id))

    for (let i = 0; i < vIds.length; i++) {
      this.setState({ [`pop-${i}`]: false, [`menu-${i}`]: false })
      for (let j = 0; j < playlists.length; j++) {
        await this.setState({ [`${i}-${j}`]: false })
        playlists[j].videos.forEach(v => {
          if (v.id === vIds[i]) {
            this.setState({ [`${i}-${j}`]: true })
          }
        })
      }
    }
  }

  handleTimeQuery = () => {
    const time = queryString.parse(this.props.location.search).time || 0
    this.setState({ currentTime: time, currentTimeString: formatTime(time) })
    if (time > 0) this.videoElement.currentTime = time
  }

  handleAddView = async () => {
    const videoId = this.props.match.params.videoId
    await this.props.addView({
      variables: { videoId },
      refetchQueries: [
        { query: VIDEO_LIST_QUERY },
        { query: VIDEO_BY_ID_QUERY, variables: { videoId } }
      ]
    })
  }

  handleThumbs = async control => {
    const likesArray = this.props.data.getVideoById.owner.likes
    const dislikesArray = this.props.data.getVideoById.owner.dislikes
    const { videoId } = this.props.match.params
    const likedId = likesArray.find(l => l === videoId)
    const dislikedId = dislikesArray.find(d => d === videoId)
    if (!dislikedId && !likedId) {
      if (control === 'like') {
        let remove = false
        return await this.props.addLike({
          variables: { videoId, remove },
          refetchQueries: [
            {
              query: VIDEO_BY_ID_QUERY,
              variables: { videoId }
            }
          ]
        })
      } else if (control === 'dislike') {
        let remove = false
        return await this.props.addDislike({
          variables: { videoId, remove },
          refetchQueries: [
            {
              query: VIDEO_BY_ID_QUERY,
              variables: { videoId }
            }
          ]
        })
      }
    } else if (!dislikedId && likedId) {
      if (control === 'like') {
        let remove = true
        return await this.props.addLike({
          variables: { videoId, remove },
          refetchQueries: [
            {
              query: VIDEO_BY_ID_QUERY,
              variables: { videoId }
            }
          ]
        })
      } else if (control === 'dislike') return
    } else if (dislikedId && !likedId) {
      if (control === 'dislike') {
        let remove = true
        return await this.props.addDislike({
          variables: { videoId, remove },
          refetchQueries: [
            {
              query: VIDEO_BY_ID_QUERY,
              variables: { videoId }
            }
          ]
        })
      } else if (control === 'like') return
    }
  }

  handleCopy = control => {
    this.setState({ copySnackbarOpen: true })
    if (control === 'share') {
      document.getElementById('link-text').select()
      document.execCommand('Copy')
    } else if (control === 'embed') {
      document.getElementById('iframe-text').select()
      document.execCommand('Copy')
    }
  }

  handleCreateComment = async () => {
    const text = this.state.comment
    const reply = true
    const { videoId } = this.props.match.params
    await this.props.createComment({
      variables: { text, reply, videoId },
      refetchQueries: [
        {
          query: VIDEO_BY_ID_QUERY,
          variables: { videoId }
        }
      ]
    })
    this.resetComment()
  }

  handleCreateSubComment = async commentId => {
    const text = this.state.subComment
    const reply = false
    const { videoId } = this.props.match.params
    await this.props.createSubComment({
      variables: { text, reply, commentId },
      refetchQueries: [
        {
          query: VIDEO_BY_ID_QUERY,
          variables: { videoId }
        }
      ]
    })
    this.resetSubComment()
  }

  handleShareModalOpen = () => this.setState({ shareDialogOpen: true })

  handleShareModalClose = () => this.setState({ shareDialogOpen: false })

  handleShareModalText = e => this.setState({ linkToShare: e.target.value })

  handleShareModalTime = e =>
    this.setState({ currentTimeString: e.target.value })

  handleEmbedModalClose = () => this.setState({ embedDialogOpen: false })

  handleEmbedModalOpen = () =>
    this.setState({ embedDialogOpen: true, shareDialogOpen: false })

  handleCopySnackbarOpen = () => this.setState({ copySnackbarOpen: true })

  handleCopySnackbarClose = () => this.setState({ copySnackbarOpen: false })

  handleCheckbox = () => this.setState({ checked: !this.state.checked })

  handleCommentText = e => this.setState({ comment: e.target.value })

  handleSubCommentText = e => this.setState({ subComment: e.target.value })

  resetComment = () => this.setState({ comment: '' })

  resetSubComment = () => this.setState({ visibleInput: null, subComment: '' })

  handleReply = i => this.setState({ visibleInput: i, subComment: '' })

  handleVideoClick = async () => {
    if (this.videoElement.paused) {
      this.videoElement.play()
    } else {
      this.videoElement.pause()
    }
    await this.setState({ showPlayPause: !this.state.showPlayPause })
    await setTimeout(
      () => this.setState({ showPlayPause: !this.state.showPlayPause }),
      500
    )
    await this.setState({ playIcon: !this.state.playIcon })
  }

  handleSetDuration = () => {
    if (this.props.data.getVideoById.duration === 0) {
      const { videoId } = this.props.match.params
      const { duration } = this.videoElement
      this.props.setDuration({
        variables: { videoId, duration },
        refetchQueries: [{ query: VIDEO_LIST_QUERY }]
      })
    }
  }

  handleMenuAnchor = i => this.setState({ [`menu-${i}`]: true })

  handleMenuClose = i => this.setState({ [`menu-${i}`]: false })

  handlePlaylistPopoverOpen = i => {
    this.handleMenuClose(i)
    this.setState({ [`pop-${i}`]: true })
  }

  handlePlaylistPopoverClose = i => this.setState({ [`pop-${i}`]: false })

  handleCollapse = () => this.setState({ collapsed: false })

  handleNewPlaylistTitle = e =>
    this.setState({ newPlaylistTitle: e.target.value })

  handleCreatePlaylist = async videoId => {
    this.handlePlaylistPopoverClose()
    await this.props.createPlaylist({
      variables: {
        input: {
          title: this.state.newPlaylistTitle,
          description: '',
          firstVideo: [videoId]
        }
      }
    })
    await this.setState({ collapsed: true, newPlaylistTitle: '' })
  }

  handlePlaylistCheckboxChange = async (v, p, vId, pId) => {
    if (!this.state[`${v}-${p}`]) {
      await this.props.addToPlaylist({
        variables: { playlistId: pId, videoId: vId, add: true }
      })
    } else {
      await this.props.addToPlaylist({
        variables: { playlistId: pId, videoId: vId, add: false }
      })
    }
    await this.setState({ [`${v}-${p}`]: !this.state[`${v}-${p}`] })
  }

  render() {
    const {
      data: { loading, getVideoById },
      videoList: { getVideoList },
      playlists: { getUserPlaylists },
      classes
    } = this.props
    const videoListLoading = this.props.videoList.loading
    if (loading || videoListLoading) return null
    const {
      title,
      description,
      url,
      poster,
      likes,
      dislikes,
      createdOn,
      views,
      owner,
      comments
    } = getVideoById
    const { id, username, imageUrl } = owner
    return [
      <div key="video-main-page" className={classes.container}>
        <VideoMain
          videoRef={video => {
            this.videoElement = video
          }}
          handleVideoClick={this.handleVideoClick}
          id={id}
          url={url}
          description={description}
          poster={poster}
          likes={likes}
          dislikes={dislikes}
          createdOn={createdOn}
          views={views}
          username={username}
          imageUrl={imageUrl}
          title={title}
          handleThumbsDislike={this.handleThumbs.bind(this, 'dislike')}
          handleThumbsLike={this.handleThumbs.bind(this, 'like')}
          handleShareModalOpen={this.handleShareModalOpen}
          handleCommentText={this.handleCommentText}
          comment={this.state.comment}
          resetComment={this.resetComment}
          createNewComment={this.handleCreateComment}
          comments={comments}
          subComment={this.state.subComment}
          handleSubCommentText={this.handleSubCommentText}
          resetSubComment={this.resetSubComment}
          handleReply={this.handleReply}
          visibleInput={this.state.visibleInput}
          createNewSubComment={this.handleCreateSubComment}
          showPlayPause={this.state.showPlayPause}
          playIcon={this.state.playIcon}
        />
        <VideoList
          videoList={getVideoList}
          handleMenuAnchor={this.handleMenuAnchor}
          anchorEl={this.state.anchorEl}
          handleMenuClose={this.handleMenuClose}
          handlePlaylistPopoverOpen={this.handlePlaylistPopoverOpen}
          handlePlaylistPopoverClose={this.handlePlaylistPopoverClose}
          handleCollapse={this.handleCollapse}
          collapsed={this.state.collapsed}
          playlists={getUserPlaylists}
          newPlaylistTitle={this.state.newPlaylistTitle}
          handleNewPlaylistTitle={this.handleNewPlaylistTitle}
          handleCreatePlaylist={this.handleCreatePlaylist}
          handlePlaylistCheckboxChange={this.handlePlaylistCheckboxChange}
          state={this.state}
        />
      </div>,
      <ShareModal
        key="video-share-modal"
        open={this.state.shareDialogOpen}
        handleShareModalClose={this.handleShareModalClose}
        handleEmbedModalOpen={this.handleEmbedModalOpen}
        linkToShare={this.state.linkToShare}
        currentTimeString={this.state.currentTimeString}
        onChange={this.handleShareModalText}
        onCopy={this.handleCopy.bind(this, 'share')}
        title={title}
        checked={this.state.checked}
        handleCheckbox={this.handleCheckbox}
        handleShareModalTime={this.handleShareModalTime}
      />,
      <Snackbar
        key="video-copy-snackbar"
        open={this.state.copySnackbarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={8000}
        onRequestClose={this.handleCopySnackbarClose}
        message={<span>Copied to clipboard</span>}
        action={
          <IconButton onClick={this.handleCopySnackbarClose} color="inherit">
            <CloseIcon />
          </IconButton>
        }
      />,
      <EmbedModal
        key="video-embed-modal"
        open={this.state.embedDialogOpen}
        handleEmbedModalClose={this.handleEmbedModalClose}
        url={url}
        onCopy={this.handleCopy.bind(this, 'embed')}
      />
    ]
  }
}

export default compose(
  withStyles(styles),
  graphql(ADD_VIEW_MUTATION, { name: 'addView' }),
  graphql(ADD_LIKE_MUTATION, { name: 'addLike' }),
  graphql(ADD_DISLIKE_MUTATION, { name: 'addDislike' }),
  graphql(CREATE_COMMENT_MUTATION, { name: 'createComment' }),
  graphql(CREATE_SUBCOMMENT_MUTATION, { name: 'createSubComment' }),
  graphql(SET_DURATION_MUTATION, { name: 'setDuration' }),
  graphql(CREATE_PLAYLIST_MUTATION, { name: 'createPlaylist' }),
  graphql(ADD_TO_PLAYLIST_MUTATION, { name: 'addToPlaylist' }),
  graphql(VIDEO_LIST_QUERY, { name: 'videoList' }),
  graphql(USER_PLAYLIST_QUERY, { name: 'playlists' }),
  graphql(VIDEO_BY_ID_QUERY, {
    options: props => ({ variables: { videoId: props.match.params.videoId } })
  })
)(Video)
