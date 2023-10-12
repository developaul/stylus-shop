import { NextPage } from 'next'
import { Box, Grid } from '@mui/material'

import {
  CartList, CheckoutForm,
  CheckoutLayout, Logo, OrderCalculation
} from '@/components'

const CheckoutPage: NextPage = () => {
  return (
    <CheckoutLayout title='checkout' >
      <Grid container>
        <Grid xs={12} md={8} item>
          <Box>
            <Logo />
          </Box>
          <CheckoutForm />
        </Grid>
        <Grid xs={12} md={4} item>
          <CartList />
          <OrderCalculation />
        </Grid>
      </Grid>
    </CheckoutLayout>
  )
}

export default CheckoutPage