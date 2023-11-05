import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { Box, Chip, CircularProgress } from '@mui/material'
import { CreditScoreOutlined as CreditScoreOutlinedIcon } from '@mui/icons-material'
import { useSnackbar } from 'notistack'

import { ShortOrder, IPaypal } from '@/interfaces'
import { OrderStatus } from '@/constants'
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
        {order.status === OrderStatus.Paid && (
          <Chip
            sx={{ my: 2 }}
            label='Orden ya fue pagada'
            variant='outlined'
            color='success'
            icon={<CreditScoreOutlinedIcon />}
          />
        )}

        {order.status === OrderStatus.Cancelled && (
          <Chip
            sx={{ my: 2 }}
            label='Orden cancelada'
            variant='outlined'
            color='error'
            icon={<CreditScoreOutlinedIcon />}
          />
        )}

        {order.status === OrderStatus.Pending && (
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
