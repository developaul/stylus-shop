import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { Box, Grid } from '@mui/material'

import { authOptions } from '../api/auth/[...nextauth]'
import { getOrderById } from '@/server'
import {
  CartList, OrderCalculation, ShippingAddress
} from '@/components/Shop'
import { CheckoutLayout } from '@/components/Layouts'
import { Logo } from '@/components/Globals'


import { ShortOrder } from '@/interfaces'

interface Props {
  order: ShortOrder
}

const OrdenPage: NextPage<Props> = ({ order }) => {

  const { _id, shippingAddress, orderProducts, orderSummary } = order

  return (
    <CheckoutLayout title={`Orden ${order._id}`} >
      <Grid spacing={10} container>
        <Grid xs={12} md={7} item>
          <Box sx={{ mb: 6 }}>
            <Logo />
          </Box>
          <ShippingAddress shippingAddress={shippingAddress} />
          {/* TODO: ADD PAYPAL METHOD HERE */}
        </Grid>
        <Grid xs={12} md={5} item>
          <CartList cartProduct={orderProducts} />
          <OrderCalculation orderSummary={orderSummary} />
        </Grid>
      </Grid>
    </CheckoutLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { id } = query as { id: string }

  const session = await getServerSession(req, res, authOptions)

  const order = await getOrderById(id)

  if (!order)
    return {
      redirect: {
        destination: '/orden/historial',
        permanent: false
      }
    }

  if (order.createdById !== session!.user._id) {
    return {
      redirect: {
        destination: `/orden/historial`,
        permanent: false
      }
    }
  }

  return {
    props: {
      order
    }
  }
}

export default OrdenPage