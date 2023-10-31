import { Box } from "@mui/material"
import { MobileMenu } from "./MobileMenu"

export const Navbar = () => {
  return (
    <Box sx={{ alignSelf: 'flex-end' }}>
      <MobileMenu />
    </Box>
  )
}
