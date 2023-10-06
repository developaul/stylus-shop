import { FC } from 'react';
import { useRouter } from 'next/router';
import { Button, Grid, GridDirection, styled } from '@mui/material'
import {
  PersonOutlineRounded as PersonOutlineRoundedIcon,
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon
} from '@mui/icons-material';

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

  const onRedirect = () => {
    router.push('/signin')
  }

  return (
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
          startIcon={<FavoriteBorderRoundedIcon color='error' />}
        >
          Favoritos
        </ButtonStyled>
      </Grid>
      <Grid item>
        <ButtonStyled
          startIcon={<ShoppingCartOutlinedIcon color='info' />}
        >
          Carrito (0)
        </ButtonStyled>
      </Grid>
    </Grid>
  )
}
