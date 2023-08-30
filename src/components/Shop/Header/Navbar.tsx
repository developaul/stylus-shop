import { Box } from "@mui/material"
import { NavbarItems } from "./NavbarItems"
import { MobileMenu } from "./MobileMenu"

export const Navbar = () => {
  return (
    <Box sx={{ alignSelf: 'flex-end' }}>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <NavbarItems gap={3.5} direction="row" />
      </Box>

      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <MobileMenu />
      </Box>
    </Box>
  )
}
