import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#272E49',
      highlight:"#fff",
    },
    secondary: {
      // main: '#6670DA',
      // main: '#7dd56f',
      main: '#28b487',
    },
    error: {
      main: red.A400,
    },
    background: {
      // default: '#F3F4FD',
      default: '#F7F7F7',
    },
    text:{
      primary:"#272E49",
      // secondary:"#fff"
    },
  },
});

export default theme;