import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import axios from 'axios'
import UploadDropzone from '../components/UploadDropzone'
import UploadDetails from '../components/UploadDetails'
import { VIDEO_LIST_QUERY } from '../queries/videoList'
import { CURRENT_USER_QUERY } from '../queries/currentUser'
import { USER_PLAYLIST_QUERY } from '../queries/userPlaylist'

class Upload extends Component {
  state = {
    file: null,
    progress: 0,
    dropzone: true,
    title: '',
    description: '',
    url: '',
    completed: false,
    id: '',
    poster: '',
    posterFile: null,
    playlistButtonText: '+ Add to playlist',
    popoverOpen: false,
    collapsed: true,
    newPlaylistTitle: '',
    searchText: '',
    filteredPlaylists: null,
    selectedPlaylists: [],
    processing: false,
    playlistButtonDisabled: false
  }

  componentDidMount() {
    setTimeout(this.setPlaylists, 2000)
    setTimeout(this.setCheckboxes, 2000)
  }

  format = (filename, folder) => {
    const d = new Date()
    const date = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`
    const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, '-')
    return `${folder}/${date}-${cleanFilename}`
  }

  uploadToS3 = async (file, requestUrl) => {
    const options = {
      headers: {
        'Content-Type': file.type
      },
      onUploadProgress: progressEvent => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        this.setState({ progress: percentCompleted })
      }
    }
    await axios.put(requestUrl, file, options)
  }

  onDropVideo = files => this.setState({ file: files[0] })

  onDropPoster = files => this.setState({ posterFile: files[0] })

  handleUploadVideo = async () => {
    const { file } = this.state
    const filename = this.format(file.name, 'videos')
    const filetype = file.type
    const response = await this.props.s3Sign({
      variables: { filename, filetype }
    })
    const { requestUrl, videoUrl } = response.data.s3Sign
    await this.setState({ dropzone: false, title: filename, url: videoUrl })
    await this.uploadToS3(file, requestUrl)
  }

  handleUploadPoster = async () => {
    const { posterFile } = this.state
    const filename = this.format(posterFile.name, 'images')
    const filetype = posterFile.type
    const response = await this.props.s3SignPoster({
      variables: { filename, filetype }
    })
    const { requestUrl, posterUrl } = response.data.s3SignPoster
    await this.setState({ poster: posterUrl })
    await this.uploadToS3(posterFile, requestUrl)
  }

  handleVideo = async () => {
    const {
      title,
      description,
      url,
      selectedPlaylists,
      filteredPlaylists
    } = this.state
    const poster = this.state.poster
      ? this.state.poster
      : 'https://s3-us-west-1.amazonaws.com/youtube-clone-assets/thumbnail.jpeg'
    const response2 = await this.props.createVideo({
      variables: { input: { title, description, url, poster } },
      refetchQueries: [
        { query: CURRENT_USER_QUERY, variables: { userId: null } },
        { query: USER_PLAYLIST_QUERY },
        { query: VIDEO_LIST_QUERY }
      ]
    })
    const { id } = response2.data.createVideo
    if (selectedPlaylists.length > 0) {
      const checkedPlaylists = await filteredPlaylists.filter(p =>
        selectedPlaylists.includes(p.title)
      )
      await checkedPlaylists.forEach(p => {
        this.props.addVideoToPlaylist({
          variables: { playlistId: p.id, videoId: id, add: true },
          refetchQueries: [{ query: USER_PLAYLIST_QUERY }]
        })
      })
    }
    await this.setState({
      completed: true,
      title: '',
      description: '',
      id,
      playlistButtonDisabled: true
    })
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleOpenPopover = () => {
    this.setState({ popoverOpen: true })
  }

  handleClosePopover = () => {
    this.setState({ popoverOpen: false, collapsed: true })
  }

  handleNewPlaylistTitle = e =>
    this.setState({ newPlaylistTitle: e.target.value })

  handleCollapse = () => this.setState({ collapsed: false })

  handleCreatePlaylist = async () => {
    await this.setState({ processing: true })
    await this.props.createEmptyPlaylist({
      variables: { title: this.state.newPlaylistTitle },
      refetchQueries: [{ query: USER_PLAYLIST_QUERY }]
    })
    setTimeout(
      () =>
        this.setState({
          newPlaylistTitle: '',
          collapsed: true,
          filteredPlaylists: this.props.data.getUserPlaylists,
          processing: false
        }),
      2000
    )
  }

  handleSearchText = e => this.setState({ searchText: e.target.value })

  setPlaylists = () =>
    this.setState({ filteredPlaylists: this.props.data.getUserPlaylists })

  setCheckboxes = () => {
    const playlists = this.props.data.getUserPlaylists
    playlists.forEach((p, i) => this.setState({ [`checkbox-${i}`]: false }))
  }

  handleSearch = async e => {
    if (e.keyCode === 13) {
      const { searchText } = this.state
      const filteredPlaylists = await this.props.data.getUserPlaylists.filter(
        p => {
          return p.title.toLowerCase().includes(searchText.toLowerCase())
        }
      )
      await this.setState({ filteredPlaylists })
    }
  }

  handleCheckbox = async (i, title) => {
    const { selectedPlaylists } = this.state
    if (!this.state[`checkbox-${i}`]) {
      if (selectedPlaylists.indexOf(title) === -1) {
        selectedPlaylists.push(title)
        if (selectedPlaylists.length === 1) {
          this.setState({
            playlistButtonText:
              title.length < 25 ? title : `${title.slice(0, 22)}...`,
            [`checkbox-${i}`]: true,
            selectedPlaylists
          })
        } else if (selectedPlaylists.length > 1) {
          this.setState({
            playlistButtonText: `${selectedPlaylists.length} playlists`,
            [`checkbox-${i}`]: true,
            selectedPlaylists
          })
        }
      }
    } else {
      let filtered = await selectedPlaylists.filter(p => p !== title)
      if (filtered.length === 1) {
        this.setState({
          playlistButtonText:
            filtered[0].length < 25
              ? filtered[0]
              : `${filtered[0].slice(0, 22)}...`,
          [`checkbox-${i}`]: false,
          selectedPlaylists: filtered
        })
      } else if (filtered.length > 1) {
        this.setState({
          playlistButtonText: `${filtered.length} playlists`,
          [`checkbox-${i}`]: false,
          selectedPlaylists: filtered
        })
      } else if (filtered.length === 0) {
        this.setState({
          playlistButtonText: '+ Add to playlist',
          [`checkbox-${i}`]: false,
          selectedPlaylists: filtered
        })
      }
    }
  }

  render() {
    const {
      file,
      progress,
      dropzone,
      title,
      description,
      id,
      completed,
      poster,
      posterFile
    } = this.state
    const {
      data: { loading }
    } = this.props
    if (loading) return null
    if (dropzone)
      return (
        <UploadDropzone
          onDrop={this.onDropVideo}
          file={file}
          handleUpload={this.handleUploadVideo}
        />
      )
    if (!dropzone)
      return (
        <UploadDetails
          progress={progress}
          completed={completed}
          id={id}
          description={description}
          title={title}
          poster={poster}
          posterFile={posterFile}
          handleChange={this.handleChange}
          handleVideo={this.handleVideo}
          handleUpload={this.handleUploadPoster}
          onDrop={this.onDropPoster}
          playlistButtonText={this.state.playlistButtonText}
          handleOpenPopover={this.handleOpenPopover}
          handleClosePopover={this.handleClosePopover}
          popoverOpen={this.state.popoverOpen}
          playlists={this.state.filteredPlaylists}
          collapsed={this.state.collapsed}
          newPlaylistTitle={this.state.newPlaylistTitle}
          handleNewPlaylistTitle={this.handleNewPlaylistTitle}
          handleCollapse={this.handleCollapse}
          handleCreatePlaylist={this.handleCreatePlaylist}
          searchText={this.state.searchText}
          handleSearchText={this.handleSearchText}
          handleSearch={this.handleSearch}
          handleCheckbox={this.handleCheckbox}
          processing={this.state.processing}
          playlistButtonDisabled={this.state.playlistButtonDisabled}
          state={this.state}
        />
      )
  }
}

const S3_SIGN_MUTATION = gql`
  mutation($filename: String!, $filetype: String!) {
    s3Sign(filename: $filename, filetype: $filetype) {
      requestUrl
      videoUrl
    }
  }
`

const CREATE_VIDEO_MUTATION = gql`
  mutation($input: VideoInput) {
    createVideo(input: $input) {
      id
    }
  }
`

const S3_SIGN_POSTER_MUTATION = gql`
  mutation($filename: String!, $filetype: String!) {
    s3SignPoster(filename: $filename, filetype: $filetype) {
      requestUrl
      posterUrl
    }
  }
`

const CREATE_EMPTY_PLAYLIST_MUTATION = gql`
  mutation($title: String!) {
    createEmptyPlaylist(title: $title) {
      id
    }
  }
`

const ADD_VIDEO_TO_PLAYLIST_MUTATION = gql`
  mutation($playlistId: ID!, $videoId: ID!, $add: Boolean!) {
    addVideoToPlaylist(playlistId: $playlistId, videoId: $videoId, add: $add) {
      id
    }
  }
`

export default compose(
  graphql(S3_SIGN_MUTATION, { name: 's3Sign' }),
  graphql(S3_SIGN_POSTER_MUTATION, { name: 's3SignPoster' }),
  graphql(CREATE_VIDEO_MUTATION, { name: 'createVideo' }),
  graphql(CREATE_EMPTY_PLAYLIST_MUTATION, { name: 'createEmptyPlaylist' }),
  graphql(ADD_VIDEO_TO_PLAYLIST_MUTATION, { name: 'addVideoToPlaylist' }),
  graphql(USER_PLAYLIST_QUERY)
)(Upload)
