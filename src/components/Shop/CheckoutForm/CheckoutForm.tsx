import NextLink from 'next/link'
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import {
  Box, Button, FormControl, FormHelperText, Grid, InputAdornment,
  OutlinedInput, Typography
} from '@mui/material'
import {
  ArrowBackRounded as ArrowBackRoundedIcon
} from '@mui/icons-material';

import { CartProductsContext, UserContext } from '@/context';
import { Validations } from '@/utils';
import { useRouter } from 'next/router';



interface FormData {
  phone: string;
  address: string;
  zipCode: string;
  country: string;
  city: string;
  email: string;
}

export const CheckoutForm = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const { createOrder } = useContext(CartProductsContext)

  const snackController = useSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  useEffect(() => {
    if (!user) return

    reset({
      email: user?.email ?? '',
      address: user?.address ?? '',
      country: user?.country ?? '',
      city: user?.city ?? '',
      phone: user?.phone ?? '',
      zipCode: user?.zipCode ?? '',
    })
  }, [reset, user])

  const handleUpdateUser = async ({ address, city, country, email, phone, zipCode }: FormData) => {
    try {
      const order = await createOrder({
        address,
        city,
        country,
        email,
        phone,
        zipCode,
      })

      router.replace(`/orden/${order._id}`)

    } catch (error: any) {
      snackController.enqueueSnackbar(error.message ?? 'Algo salio mal', { variant: 'error' })
    }
  }

  return (
    <Box sx={{ mt: 4 }} onSubmit={handleSubmit(handleUpdateUser)} noValidate component={'form'}>
      <Typography variant='subtitle1' component='h2' >Información</Typography>

      <Grid sx={{ mt: 2 }} spacing={1} container>
        <Grid xs={12} md={6} item>
          <FormControl
            fullWidth
            variant="outlined">
            <OutlinedInput
              {...register('address', { required: 'La direccion es obligatoria' })}
              error={Boolean(errors.address)}
              fullWidth
              id="outlined-adornment-address"
              startAdornment={<InputAdornment component='label' htmlFor='outlined-adornment-address' sx={{ mr: 2 }} position="end">Direccion: </InputAdornment>}
              aria-describedby="outlined-address-helper-text"
              inputProps={{
                'aria-label': 'address',
              }}
            />
            {Boolean(errors.address) && (
              <FormHelperText error id="outlined-address-helper-text">{errors.address?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid xs={12} md={6} item>
          <FormControl
            fullWidth
            variant="outlined">
            <OutlinedInput
              {...register('zipCode', { required: 'El codigo zip es obligatorio' })}
              error={Boolean(errors.zipCode)}
              fullWidth
              id="outlined-adornment-zipCode"
              startAdornment={<InputAdornment component='label' htmlFor='outlined-adornment-zipCode' sx={{ mr: 2 }} position="end">Codigo zip: </InputAdornment>}
              aria-describedby="outlined-zipCode-helper-text"
              inputProps={{
                'aria-label': 'zipCode',
              }}
            />
            {Boolean(errors.zipCode) && (
              <FormHelperText error id="outlined-zipCode-helper-text">{errors.zipCode?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid xs={12} md={6} item>
          <FormControl
            fullWidth
            variant="outlined">
            <OutlinedInput
              {...register('email', { required: 'El Email es obligatorio', validate: Validations.isEmail })}
              error={Boolean(errors.phone)}
              fullWidth
              id="outlined-adornment-email"
              startAdornment={<InputAdornment component='label' htmlFor='outlined-adornment-email' sx={{ mr: 2 }} position="end">Email: </InputAdornment>}
              aria-describedby="outlined-email-helper-text"
              inputProps={{
                'aria-label': 'email',
              }}
            />
            {Boolean(errors.email) && (
              <FormHelperText error id="outlined-email-helper-text">{errors.email?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid xs={12} md={6} item>
          <FormControl
            fullWidth
            variant="outlined">
            <OutlinedInput
              {...register('phone', { required: 'El telefono es obligatorio' })}
              error={Boolean(errors.phone)}
              fullWidth
              id="outlined-adornment-phone"
              startAdornment={<InputAdornment component='label' htmlFor='outlined-adornment-phone' sx={{ mr: 2 }} position="end">Celular: </InputAdornment>}
              aria-describedby="outlined-phone-helper-text"
              inputProps={{
                'aria-label': 'phone',
              }}
            />
            {Boolean(errors.phone) && (
              <FormHelperText error id="outlined-phone-helper-text">{errors.phone?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid xs={12} md={6} item>
          <FormControl
            fullWidth
            variant="outlined">
            <OutlinedInput
              {...register('country', { required: 'El Pais es obligatoria' })}
              error={Boolean(errors.country)}
              fullWidth
              id="outlined-adornment-country"
              startAdornment={<InputAdornment component='label' htmlFor='outlined-adornment-country' sx={{ mr: 2 }} position="end">Pais: </InputAdornment>}
              aria-describedby="outlined-country-helper-text"
              inputProps={{
                'aria-label': 'country',
              }}
            />
            {Boolean(errors.country) && (
              <FormHelperText error id="outlined-city-helper-text">{errors.country?.message}</FormHelperText>
            )}
          </FormControl>

        </Grid>

        <Grid xs={12} md={6} item>
          <FormControl
            fullWidth
            variant="outlined">
            <OutlinedInput
              {...register('city', { required: 'La ciudad es obligatoria' })}
              error={Boolean(errors.city)}
              fullWidth
              id="outlined-adornment-city"
              startAdornment={<InputAdornment component='label' htmlFor='outlined-adornment-city' sx={{ mr: 2 }} position="end">Ciudad: </InputAdornment>}
              aria-describedby="outlined-city-helper-text"
              inputProps={{
                'aria-label': 'city',
              }}
            />
            {Boolean(errors.city) && (
              <FormHelperText error id="outlined-city-helper-text">{errors.city?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>

      <Grid sx={{ mt: 2 }} spacing={2} container>
        <Grid xs={12} md={6} item>
          <Button
            LinkComponent={NextLink}
            href='/carrito'
            startIcon={<ArrowBackRoundedIcon />} >Volver al carrito</Button>
        </Grid>
        <Grid xs={12} md={6} item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type='submit'
            variant='contained' >Crear Orden</Button>
        </Grid>
      </Grid>
    </Box >
  )
}
