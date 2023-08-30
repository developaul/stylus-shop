import { Box, Grid } from '@mui/material'
import React from 'react'
import { CustomButton, CustomTextField } from '..'

export const RegisterForm = () => {
  return (
    <>
      <Grid container direction='column' gap={2}>
        <Grid item>
          <CustomTextField
            label={'Nombres'}
            placeholder='Paul'
          />
        </Grid>

        <Grid item>
          <CustomTextField
            label={'Apellidos'}
            placeholder='Guzman'
          />
        </Grid>

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

      <Box
        sx={{ marginTop: 2.5 }}
        display='flex' alignItems='center' justifyContent='center'>
        <CustomButton
          variant='outlined'
        >
          Ingresar
        </CustomButton>
      </Box>
    </>
  )
}
