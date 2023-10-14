import { useContext } from 'react';
import { Box, FormControl, Grid, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';

import { UserContext } from '@/context';
import { CustomButton } from '..'

import { Validations } from '@/utils';

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const RegisterForm = () => {

  const { register: _register } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(_register)} noValidate >
      <Grid container direction='column' gap={2}>
        <Grid item>
          <FormControl fullWidth>
            <Typography sx={{ mb: 1 }} component='label' htmlFor={'firstName-input'} >Nombre:</Typography>
            <TextField
              {...register('firstName', {
                required: 'El nombre es obligatorio',
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              fullWidth
              type='firstName'
              id="firstName-input"
              placeholder='Paul'
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <Typography sx={{ mb: 1 }} component='label' htmlFor={'lastName-input'} >Apellido:</Typography>
            <TextField
              {...register('lastName', {
                required: 'El apellido es obligatorio',
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
              fullWidth
              type='lastName'
              id="lastName-input"
              placeholder='Castillo'
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <Typography sx={{ mb: 1 }} component='label' htmlFor={'email-input'} >Email:</Typography>
            <TextField
              {...register('email', {
                required: 'El email es obligatorio',
                validate: Validations.isEmail
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              fullWidth
              type='email'
              id="email-input"
              placeholder='example@example.com'
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <Typography sx={{ mb: 1 }} component='label' htmlFor={'password-input'} >Contraseña:</Typography>
            <TextField
              {...register(
                'password',
                { required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'Minimo 6 caracteres' } }
              )}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              fullWidth
              type='password'
              id="password-input"
              placeholder='*********'
            />
          </FormControl>
        </Grid>
      </Grid>

      <Box
        sx={{ marginTop: 2.5 }}
        display='flex' alignItems='center' justifyContent='center'>
        <CustomButton
          type='submit'
          variant='outlined'
        >
          Ingresar
        </CustomButton>
      </Box>
    </form>
  )
}
