import NextLink from 'next/link'
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box, Button, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment,
  OutlinedInput, Radio, RadioGroup, Typography
} from '@mui/material'
import {
  ArrowBackRounded as ArrowBackRoundedIcon
} from '@mui/icons-material';

import { UserContext } from '@/context';
import { Validations } from '@/utils';


interface FormData {
  phone: string;
  address: string;
  zipCode: string;
  country: string;
  city: string;
  email: string;
  loaded: boolean;
}

export const CheckoutForm = () => {

  const { user, updateUser } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
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
      loaded: true
    })
  }, [reset, user])

  const handleUpdateUser = async ({ address, city, country, email, phone, zipCode }: FormData) => {
    try {
      await updateUser({
        address,
        city,
        country,
        email,
        phone,
        zipCode,
        userId: user!._id!,
      })
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message

      setError('email', { message: errorMessage })
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

      <Typography sx={{ mt: 2 }} variant='subtitle1' component='h2'>Metodo de pago</Typography>
      <Typography>Todas las transacciones son seguras y están encriptadas</Typography>

      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
        // value={value}
        // onChange={handleChange}
        >
          <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
          <FormControlLabel value="creditCard" control={<Radio />} label="Tarjeta de credito / debito" />
        </RadioGroup>
      </FormControl>


      <Grid sx={{ mt: 2 }} spacing={1} container>


        <Grid xs={12} md={6} item></Grid>
        <Grid xs={12} md={6} item></Grid>
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
            variant='contained' >Continuar con los envíos</Button>
        </Grid>
      </Grid>
    </Box >
  )
}
