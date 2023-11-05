import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { Box, Chip, CircularProgress } from '@mui/material'
import {
  CreditScoreOutlined as CreditScoreOutlinedIcon,
} from '@mui/icons-material'
import { useSnackbar } from 'notistack'

import { OrderStatus } from '@/components/Shop'

import { ShortOrder, IPaypal } from '@/interfaces'
import { OrderStatus as IOrderStatus } from '@/constants'
import { orderDataSource } from '@/datasources'

interface Props {
  order: ShortOrder
  isCancelling: boolean
}

export const PayButtons: FC<Props> = ({ order, isCancelling }) => {

  const snackController = useSnackbar()

  const router = useRouter()

  const [isPaying, setIsPaying] = useState(false)

  const onOrderCompleted = async (details: IPaypal.OrderResponseBody) => {
    if (details.status !== 'COMPLETED')
      return snackController.enqueueSnackbar('No hay pago en Paypal', { variant: 'error' })

    setIsPaying(true)

    try {
      await orderDataSource.payOrder({ orderId: order._id, transactionId: details.id })
      router.reload()
    } catch (error: any) {
      setIsPaying(false)
      console.error(error)
      snackController.enqueueSnackbar(error.message, { variant: 'error' })
    }
  }


  return (
    <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>

      <Box sx={{ display: isPaying ? 'flex' : 'none' }} display='flex' justifyContent='center' className='fadeIn'>
        <CircularProgress />
      </Box>

      <Box sx={{ display: isPaying ? 'none' : 'flex', flex: 1, flexDirection: 'column' }}>

        {[IOrderStatus.Cancelled, IOrderStatus.Paid].includes(order.status) && (
          <OrderStatus status={order.status} />
        )}

        {order.status === IOrderStatus.Pending && (
          <PayPalButtons
            disabled={isCancelling || isPaying}
            createOrder={(_, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: `${order.orderSummary.total}`
                    }
                  }
                ]
              })
            }}
            onApprove={(_, actions) => {
              return actions.order!.capture().then(details => {
                onOrderCompleted(details)
              })
            }}
          />
        )}
      </Box>
    </Box>
  )
}
