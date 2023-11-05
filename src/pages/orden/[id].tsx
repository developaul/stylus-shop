import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { Box, Button, Card, CardContent, Grid, ButtonBase } from '@mui/material'
import { NotInterestedOutlined as NotInterestedOutlinedIconIcon } from '@mui/icons-material';

import { authOptions } from '../api/auth/[...nextauth]'
import { getOrderById } from '@/server'
import {
  CartList, OrderCalculation, PayButtons, ShippingAddress
} from '@/components/Shop'
import { CheckoutLayout } from '@/components/Layouts'
import { Logo } from '@/components/Globals'


import { ShortOrder } from '@/interfaces'

interface Props {
  order: ShortOrder
}

const OrdenPage: NextPage<Props> = ({ order }) => {

  const { _id, shippingAddress, orderProducts, orderSummary } = order

  const onCancelOrder = () => {

  }

  return (
    <CheckoutLayout title={`Orden ${order._id}`} >
      <Grid spacing={10} container>
        <Grid xs={12} md={7} item>
          <Box sx={{ mb: 6 }}>
            <Logo />
          </Box>

          <Card>
            <CardContent>
              <ShippingAddress shippingAddress={shippingAddress} />

              <PayButtons order={order} />
            </CardContent>
          </Card>

          <Box sx={{ mt: 4, display: 'flex' }}>
            <Button
              onClick={onCancelOrder}
              variant='contained'
              color='error'
              startIcon={<NotInterestedOutlinedIconIcon />}
            >
              Cancelar orden
            </Button>

          </Box>
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