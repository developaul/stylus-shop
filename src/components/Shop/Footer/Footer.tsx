import NextLink from 'next/link'
import { Box, Typography, Link } from '@mui/material'
import {
  MenuBookRounded as MenuBookRoundedIcon,
  FavoriteRounded as FavoriteRoundedIcon
} from '@mui/icons-material'

import { SocialNetworks } from './SocialNetworks'

import { socialNetworks } from '@/constants'

export const Footer = () => {
  return (
    <Box
      gap={2}
      display='flex'
      alignItems='center'
      flexDirection='column'
      maxWidth={950}
      marginX='auto'
      marginTop={5}
    >
      <SocialNetworks
        socialNetworks={socialNetworks} />

      <MenuBookRoundedIcon
        sx={{
          width: 100,
          height: 80
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: {
            xs: 0.5,
            md: 2.5
          },
          flexDirection: {
            xs: 'column', md: 'row'
          },
        }}
      >
        <Typography>
          Aviso legal
        </Typography>

        <Typography>
          Política de privacidad
        </Typography>

        <Typography>
          Términos y condiciones
        </Typography>

        <Typography>
          Entrega y devoluciones
        </Typography>
      </Box>

      <Typography>Todos los derechos reservados</Typography>

      <Typography display='flex' alignItems='center'>
        Hecho por&nbsp;
        <Link
          component={NextLink}
          href='https://github.com/developaul'>
          @developaul
        </Link>&nbsp;
        con&nbsp;<FavoriteRoundedIcon color='primary' /> </Typography>
    </Box>
  )
}
