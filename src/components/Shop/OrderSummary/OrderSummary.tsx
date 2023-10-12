import { Box, Typography } from '@mui/material'

import { OrderCalculation } from '.'

export const OrderSummary = () => {

  return (
    <Box sx={{ backgroundColor: 'grey.300', borderRadius: 5, padding: 2 }} >
      <Box sx={{ backgroundColor: 'common.white', borderRadius: 3, paddingY: 2, paddingX: 4, mb: 4 }}>
        <Typography variant='h5' sx={{ textAlign: 'center' }} >Resumen del pedido</Typography>
      </Box>

      <OrderCalculation />
    </Box>
  )
}
