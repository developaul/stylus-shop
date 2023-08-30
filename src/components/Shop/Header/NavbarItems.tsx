import { FC } from 'react';
import { useRouter } from 'next/router';
import { Button, Grid, GridDirection } from '@mui/material'
import {
  PersonOutlineRounded as PersonOutlineRoundedIcon,
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon
} from '@mui/icons-material';

interface Props {
  direction: GridDirection
  gap: number
}

export const NavbarItems: FC<Props> = ({ direction, gap }) => {
  const router = useRouter()

  const onRedirect = () => {
    router.push('/signin')
  }

  return (
    <Grid container direction={direction} gap={gap} >
      <Grid item>
        <Button
          startIcon={<PersonOutlineRoundedIcon />}
          onClick={onRedirect}
        >
          Iniciar sesión
        </Button>
      </Grid>
      <Grid item>
        <Button
          startIcon={<FavoriteBorderRoundedIcon />}
        >
          Favoritos
        </Button>
      </Grid>
      <Grid item>
        <Button
          startIcon={<ShoppingCartOutlinedIcon />}
        >
          Carrito (0)
        </Button>
      </Grid>
    </Grid>
  )
}
