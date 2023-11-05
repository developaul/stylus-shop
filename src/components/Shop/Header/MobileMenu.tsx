import { useContext, useState } from 'react';
import { Container, Divider, Drawer, IconButton } from '@mui/material'
import { MenuRounded as MenuRoundedIcon } from '@mui/icons-material';

import { NavbarItems } from './NavbarItems';
import { AdminItems } from './AdminItems';

import { UserContext } from '@/context';
import { UserRole } from '@/constants';

export const MobileMenu = () => {
  const { user } = useContext(UserContext)

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
        {(user?.role === UserRole.Admin) && (
          <>
            <Divider />
            <Container sx={{ paddingTop: 2 }} >
              <AdminItems onClose={toggleDrawer} gap={1} direction="column" />
            </Container>
          </>
        )}

      </Drawer>
    </>
  )
}
