import { ThemeOptions, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    bgButtons?: Palette['primary'];
  }
  interface PaletteOptions {
    bgButtons?: PaletteOptions['primary'];
  }
}

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: '#46A358',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
    bgButtons: {
      main: '#c8e3cd',
      light: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Cera Pro',
  },
};

export default createTheme(theme);
