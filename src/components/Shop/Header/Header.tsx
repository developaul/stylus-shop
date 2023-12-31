import { Box } from "@mui/material"

import { Logo } from "@/components/Globals"
import { Navbar } from "./Navbar"

export const Header = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Navbar />

      <Box sx={{ marginTop: { xs: 0, md: 5 } }} >
        <Logo />
      </Box>
    </Box>
  )
}
