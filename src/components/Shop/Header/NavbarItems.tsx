import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Drawer, Grid, GridDirection, styled } from '@mui/material'
import {
  PersonOutlineRounded as PersonOutlineRoundedIcon,
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon
} from '@mui/icons-material';

import { FavoriteList } from '../FavoriteList';

interface Props {
  direction: GridDirection
  gap: number
}

const ButtonStyled = styled(Button)(
  ({ theme }) => `
  text-transform: capitalize;
  font-weight: 400;
  color: ${theme.palette.common.black};
`)

export const NavbarItems: FC<Props> = ({ direction, gap }) => {
  const router = useRouter()

  const [cartListIsOpen, setCartListIsOpen] = useState(false)
  const [favoriteListIsOpen, setFavoriteListIsOpen] = useState(false)

  const onRedirect = () => {
    router.push('/signin')
  }

  const toggleCartListIsOpen = () => setCartListIsOpen(prev => !prev)
  const toggleFavoriteListIsOpen = () => setFavoriteListIsOpen(prev => !prev)

  return (
    <>
      <Grid container direction={direction} gap={gap} >
        <Grid item>
          <ButtonStyled
            startIcon={<PersonOutlineRoundedIcon />}
            onClick={onRedirect}
          >
            Iniciar sesión
          </ButtonStyled>
        </Grid>
        <Grid item>
          <ButtonStyled
            onClick={toggleFavoriteListIsOpen}
            startIcon={<FavoriteBorderRoundedIcon color='error' />}
          >
            Favoritos
          </ButtonStyled>
        </Grid>
        <Grid item>
          <ButtonStyled
            onClick={toggleCartListIsOpen}
            startIcon={<ShoppingCartOutlinedIcon color='info' />}
          >
            Carrito (0)
          </ButtonStyled>
        </Grid>
      </Grid>

      <Drawer
        anchor='right'
        open={favoriteListIsOpen}
        onClose={toggleFavoriteListIsOpen}
      >
        <FavoriteList
          onClose={toggleFavoriteListIsOpen}
        />
      </Drawer>

      <Drawer
        anchor='right'
        open={cartListIsOpen}
        onClose={toggleCartListIsOpen}
      >
        CARRITO
      </Drawer>
    </>
  )
}
