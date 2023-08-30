import { useState } from 'react';
import { Container, Drawer, IconButton } from '@mui/material'
import { MenuRounded as MenuRoundedIcon } from '@mui/icons-material';

import { NavbarItems } from './NavbarItems';

export const MobileMenu = () => {

  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const toggleDrawer = () => setDrawerIsOpen(prev => !prev)

  return (
    <>
      <IconButton onClick={toggleDrawer}>
        <MenuRoundedIcon />
      </IconButton>

      <Drawer
        anchor='right'
        open={drawerIsOpen}
        onClose={toggleDrawer}
      >
        <Container sx={{ paddingTop: 6 }} >
          <NavbarItems gap={1} direction="column" />
        </Container>
      </Drawer>
    </>
  )
}
