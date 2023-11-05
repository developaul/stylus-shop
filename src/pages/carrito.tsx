import React from 'react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { Box, Button, Grid } from '@mui/material'

import { Services, OrderSummary, CartList } from '@/components/Shop'
import { ShopLayout } from '@/components/Layouts'

const CartPage: NextPage = () => {
  return (
    <ShopLayout title='Carito de compras' >

      <Grid sx={{ mt: 6 }} spacing={4} container>
        <Grid xs={12} md={6} item>
          <CartList enableDelete enableCounter />
        </Grid>
        <Grid xs={12} md={6} item>
          <OrderSummary />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4 }}>
        <Button variant='contained' LinkComponent={NextLink} href='/checkout' >
          Continuar con pedido
        </Button>
      </Box>

      <Services />
    </ShopLayout>
  )
}

export default CartPage