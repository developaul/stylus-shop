import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

export const CheckoutForm = () => {
  return (
    <Box component={'form'}>
      <Typography>Información</Typography>

      <Grid container>
        <Grid xs={12} item>
          <TextField />
        </Grid>
        <Grid xs={12} item>
          <TextField />
        </Grid>
      </Grid>
    </Box>
  )
}
