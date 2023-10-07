import React from 'react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { Box, Button, Grid } from '@mui/material'

import { Services, ShopLayout, OrderSummary, CartList } from '@/components'

const CartPage: NextPage = () => {
  return (
    <ShopLayout title='Carito de compras' >

      <Grid sx={{ mt: 6 }} container>
        <Grid xs={12} md={6} item>
          <CartList />
        </Grid>
        <Grid xs={12} md={6} item>
          <OrderSummary />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4 }}>
        <Button LinkComponent={NextLink} href='/orden' >
          Continuar con pedido
        </Button>
      </Box>

      <Services />
    </ShopLayout>
  )
}

export default CartPage