import { Box, Typography } from '@mui/material'
import {
  MenuBookRounded as MenuBookRoundedIcon
} from '@mui/icons-material'

import { MadeBy } from './MadeBy'

export const Footer = () => {
  return (
    <Box
      gap={2}
      display='flex'
      alignItems='center'
      flexDirection='column'
      maxWidth={950}
      marginX='auto'
      marginY={5}
    >
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

      <MadeBy />
    </Box>
  )
}
