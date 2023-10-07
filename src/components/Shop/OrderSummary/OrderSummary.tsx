import { useContext } from 'react'
import { Box, Divider, Typography, styled } from '@mui/material'

import { CartProductsContext } from '@/context'
import { Currency } from '@/utils'

const BoxStyled = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 20px;
`

export const OrderSummary = () => {
  const { orderSummary } = useContext(CartProductsContext)

  return (
    <Box sx={{ backgroundColor: 'grey.300', borderRadius: 5, padding: 3 }} >
      <Box sx={{ backgroundColor: 'common.white', borderRadius: 3, paddingY: 2, paddingX: 4, mb: 4 }}>
        <Typography variant='h5' sx={{ textAlign: 'center' }} >Resumen del pedido</Typography>
      </Box>

      <BoxStyled>
        <Typography>Valor del pedido</Typography>
        <Typography>{Currency.format(orderSummary.orderValue)}</Typography>
      </BoxStyled>

      <BoxStyled>
        <Typography>Delivery</Typography>
        <Typography>{Currency.format(orderSummary.delivery)}</Typography>
      </BoxStyled>


      <Divider sx={{ mb: 4 }} />

      <BoxStyled>
        <Typography>Total</Typography>
        <Typography>{Currency.format(orderSummary.total)}</Typography>
      </BoxStyled>
    </Box>
  )
}
