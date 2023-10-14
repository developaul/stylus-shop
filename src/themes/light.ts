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
    }
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
    }
  }
});
console.log("🚀 ~ file: light.ts:52 ~ lightTheme:", lightTheme)



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