import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { CustomButton, CustomTextField } from '..'

export const SignInForm = () => {
  return (
    <>
      <Grid container direction='column' gap={2}>
        <Grid item>
          <CustomTextField
            label={'Email'}
            placeholder='Email@mail.com'
          />
        </Grid>

        <Grid item>
          <CustomTextField
            label={'Contraseña'}
            placeholder='*********'
          />
        </Grid>
      </Grid>

      <Typography
        sx={{ margin: '40px 0' }}
      >¿Olvidaste tu contraseña?</Typography>

      <Box display='flex' alignItems='center' justifyContent='center'>
        <CustomButton
          variant='outlined'
        >
          Ingresar
        </CustomButton>
      </Box>
    </>
  )
}
