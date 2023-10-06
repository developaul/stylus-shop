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
  }
});
console.log("🚀 ~ file: light.ts:29 ~ lightTheme:", lightTheme)

