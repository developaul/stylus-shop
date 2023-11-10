import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import { useState } from 'react';
import { getServerSession } from 'next-auth'
import { Box, Button, Card, CardContent, Grid } from '@mui/material'
import {
  NotInterestedOutlined as NotInterestedOutlinedIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

import { useSnackbar } from 'notistack';

import { authOptions } from '../api/auth/[...nextauth]'
import { getOrderById } from '@/server'
import {
  CartList, OrderCalculation, OrderStatus, PayButtons, ShippingAddress
} from '@/components/Shop'
import { CheckoutLayout } from '@/components/Layouts'
import { Logo } from '@/components/Globals'


import { ShortOrder } from '@/interfaces'
import { orderDataSource } from '@/datasources';
import { OrderStatus as IOrderStatus } from '@/constants';

interface Props {
  order: ShortOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

  const { _id, shippingAddress, orderProducts, orderSummary } = order

  const router = useRouter()
  const snackbarController = useSnackbar()

  const [isCancelling, setIsCancelling] = useState(false)

  const onCancelOrder = async () => {
    setIsCancelling(true)

    try {
      await orderDataSource.cancelOrder(_id)
      router.reload()
    } catch (error: any) {
      setIsCancelling(false)
      console.error(error)
      snackbarController.enqueueSnackbar(error.message ?? 'Hubo un error', { variant: 'error' })
    }
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

              <PayButtons isCancelling={isCancelling} order={order} />
            </CardContent>
          </Card>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              href='/orden/historial'
              LinkComponent={NextLink}
              variant='contained'
              disabled={isCancelling}
              startIcon={<ArrowBackIcon />}
            >
              Volver a todas las ordenes
            </Button>

            {order.status === IOrderStatus.Pending && (
              <Button
                onClick={onCancelOrder}
                variant='contained'
                disabled={isCancelling}
                color='error'
                startIcon={<NotInterestedOutlinedIcon />}
              >
                Cancelar orden
              </Button>
            )}
          </Box>
        </Grid>
        <Grid xs={12} md={5} item>
          <OrderStatus status={order.status} />
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

export default OrderPage