import { createTheme } from '@mui/material/styles';

// ProFix UI Style Guidelines
export const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // dark blue
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00B3B3', // aqua
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF', // white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2E2E2E', // dark gray
    },
    info: {
      main: '#007BFF', // light blue (for buttons/highlights)
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
        },
        containedPrimary: {
          backgroundColor: '#007BFF', // highlight color for buttons
          '&:hover': {
            backgroundColor: '#0062cc',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#003366',
        },
      },
    },
  },
});