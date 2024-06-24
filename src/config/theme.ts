import { ThemeOptions, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    bgButtons?: Palette['primary'];
  }
  interface PaletteOptions {
    bgButtons?: PaletteOptions['primary'];
  }
}
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    md1: true;
    sm1: true;
  }
}

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: '#46A358',
    },
    secondary: {
      main: '#ff0000',
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 550,
      sm1: 450,
      md: 900,
      lg: 1200,
      xl: 1920,
      md1: 750,
    },
  },
};

export default createTheme(theme);
