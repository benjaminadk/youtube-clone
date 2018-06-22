import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#232323'
    },
    secondary: {
      main: '#FF0000'
    },
    background: {
      paper: '#242424',
      default: '#121212'
    },
    text: {
      primary: '#DDDDDD',
      secondary: '#707070',
      disabled: '#DDDDDD'
    },
    action: {
      active: '#707070',
      hover: '#939393'
    },
    divider: '#707070'
  },
  overrides: {
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent'
        }
      }
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#DDDDDD'
        }
      }
    }
  }
})
