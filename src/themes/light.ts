import { breakPoints } from "@/constants";
import { createTheme } from "@mui/material";


export const lightTheme = createTheme({
  typography: {
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

