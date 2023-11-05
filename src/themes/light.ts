import { breakPoints } from "@/constants";
import { createTheme } from "@mui/material";


export const lightTheme = createTheme({
  palette: {
    error: {
      main: '#FE0000',
      "300": '#FF6B6B'
    },
    info: {
      main: "#2864FF"
    },

    primary: {
      main: '#1E1E1E'
    },
    secondary: {
      main: '#3A64D8'
    },
    mode: 'light'
  },
  typography: {
    subtitle1: {
      fontSize: 28,
    },
    subtitle2: {
      fontSize: 14,
      [breakPoints.md]: {
        fontSize: 18,
      }
    },
    body2: {
      fontSize: 10,
      [breakPoints.md]: {
        fontSize: 16
      }
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600
        },
        h2: {
          fontSize: 20,
          fontWeight: 400
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.grey[800],
          textTransform: 'unset',
          borderRadius: theme.spacing(4),
          '&:hover': {
            backgroundColor: theme.palette.grey[50]
          }
        })
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: ({ theme }) => ({
            color: theme.palette.common.white,
            backgroundColor: theme.palette.grey[500],
            '&:hover': {
              backgroundColor: theme.palette.grey[600]
            }
          })
        }
      ]
    },
    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        }
      }
    }
  }
});



// 50: "#fafafa"
// 100: "#f5f5f5"
// 200: "#eeeeee"
// 300: "#e0e0e0"
// 400: "#bdbdbd"
// 500: "#9e9e9e"
// 600: "#757575"
// 700: "#616161"
// 800: "#424242"
// 900: "#212121"
// A100: "#f5f5f5"
// A200: "#eeeeee"
// A400: "#bdbdbd"
// A700: "#616161"