import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Box, FormControl, Grid, TextField, Typography } from '@mui/material'

import { UserContext } from '@/context'
import { CustomButton } from '..'

import { Validations } from '@/utils'

interface FormData {
  email: string
  password: string
}

export const SignInForm = () => {

  const { login } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = ({ email, password }: FormData) => {
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate >
      <Grid container direction='column' gap={2}>
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


      <Box sx={{ mt: 4 }} display='flex' alignItems='center' justifyContent='center'>
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
