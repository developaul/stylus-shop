import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { Box, Grid } from '@mui/material'

import { getOrderById } from '@/server'
import {
  CartList, CheckoutLayout,
  Logo, OrderCalculation
} from '@/components'
import { authOptions } from '../api/auth/[...nextauth]'

import { ShortOrder } from '@/interfaces'

interface Props {
  order: ShortOrder
}

const OrdenPage: NextPage<Props> = ({ order }) => {


  return (
    <CheckoutLayout title={`Orden ${order._id}`} >
      <Grid spacing={10} container>
        <Grid xs={12} md={7} item>
          <Box>
            <Logo />
          </Box>
          {/* <CheckoutForm /> */}
        </Grid>
        <Grid xs={12} md={5} item>
          <CartList cartProduct={order.orderProducts} />
          <OrderCalculation orderSummary={order.orderSummary} />
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