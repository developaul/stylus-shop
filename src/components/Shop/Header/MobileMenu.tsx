import { useContext, useState } from 'react';
import { Container, Divider, Drawer, IconButton } from '@mui/material'
import { MenuRounded as MenuRoundedIcon } from '@mui/icons-material';

import { UserContext } from '@/context';
import { NavbarItems } from './NavbarItems';
import { AdminItems } from './AdminItems'

export const MobileMenu = () => {
  const { isLoggedIn } = useContext(UserContext)

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
        <Container sx={{ paddingTop: 6, paddingBottom: 2 }} >
          <NavbarItems gap={1} direction="column" />
        </Container>
        {isLoggedIn && (
          <>
            <Divider />
            <Container sx={{ paddingTop: 2 }} >
              <AdminItems gap={1} direction="column" />
            </Container>
          </>
        )}

      </Drawer>
    </>
  )
}
