import NextLink from 'next/link'
import {
  Box, Button, ButtonBase, FormControl, FormHelperText, Grid, InputAdornment,
  OutlinedInput, TextField, Typography
} from '@mui/material'

import { ArrowBackRounded as ArrowBackRoundedIcon } from '@mui/icons-material';

export const CheckoutForm = () => {
  return (
    <Box component={'form'}>
      <Typography>Información</Typography>

      <Grid container>
        <Grid xs={12} item>
          <FormControl
            fullWidth
            variant="outlined">
            <OutlinedInput
              fullWidth
              id="outlined-adornment-email"
              startAdornment={<InputAdornment sx={{ mr: 2 }} position="end">Contacto: </InputAdornment>}
              aria-describedby="outlined-email-helper-text"
              inputProps={{
                'aria-label': 'email',
              }}
            />
            <FormHelperText id="outlined-email-helper-text"></FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} item>
          <FormControl
            fullWidth
            variant="outlined">
            <OutlinedInput
              fullWidth
              id="outlined-adornment-address"
              startAdornment={<InputAdornment sx={{ mr: 2 }} position="end">Enviar a: </InputAdornment>}
              aria-describedby="outlined-email-helper-text"
              inputProps={{
                'aria-label': 'email',
              }}
            />
            <FormHelperText id="outlined-email-helper-text"></FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid spacing={2} container>
        <Grid xs={12} md={6} item>
          <Button
            LinkComponent={NextLink}
            href='/carrito'
            startIcon={<ArrowBackRoundedIcon />} >Volver al carrito</Button>
        </Grid>
        <Grid xs={12} md={6} item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='contained' >Continuar con los envíos</Button>
        </Grid>
      </Grid>
    </Box>
  )
}
