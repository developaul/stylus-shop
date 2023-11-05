import { NextPage } from 'next'
import { Box, Grid } from '@mui/material'

import {
  CartList, CheckoutForm,
  OrderCalculation
} from '@/components/Shop'
import { Logo } from '@/components/Globals'
import { CheckoutLayout } from '@/components/Layouts'

const CheckoutPage: NextPage = () => {
  return (
    <CheckoutLayout title='checkout' >
      <Grid spacing={10} container>
        <Grid xs={12} md={7} item>
          <Box>
            <Logo />
          </Box>
          <CheckoutForm />
        </Grid>
        <Grid xs={12} md={5} item>
          <CartList />
          <OrderCalculation />
        </Grid>
      </Grid>
    </CheckoutLayout>
  )
}

export default CheckoutPage