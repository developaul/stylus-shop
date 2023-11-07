import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { Box, Button, Card, CardContent, Grid } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import { getOrderById } from '@/server'
import { AdminLayout } from '@/components/Layouts'
import {
  CartList, OrderCalculation,
  OrderStatus, ShippingAddress
} from '@/components/Shop'

import { ShortOrder } from '@/interfaces'

interface Props {
  order: ShortOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress, orderProducts, orderSummary } = order

  return (
    <AdminLayout
      title=''
      subTitle=''
    >
      <Grid spacing={10} container>
        <Grid xs={12} md={7} item>

          <Card>
            <CardContent>
              <ShippingAddress shippingAddress={shippingAddress} />

            </CardContent>
          </Card>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              href='/admin/ordenes'
              LinkComponent={NextLink}
              variant='contained'
              startIcon={<ArrowBackIcon />}
            >
              Volver a todas las ordenes
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} md={5} item>
          <OrderStatus status={order.status} />
          <CartList cartProduct={orderProducts} />
          <OrderCalculation orderSummary={orderSummary} />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { id } = query as { id: string }

  const order = await getOrderById(id)

  if (!order)
    return {
      redirect: {
        destination: '/admin/ordenes',
        permanent: false
      }
    }

  return {
    props: {
      order
    }
  }
}

export default OrderPage