import { useContext } from 'react'
import { Box, Divider, Typography, styled } from '@mui/material'
import { CartProductsContext } from '@/context'


import { Currency } from '@/utils'

const BoxStyled = styled(Box)`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;

  & > p {
    text-align: center;
  }
`


export const OrderCalculation = () => {
  const { orderSummary } = useContext(CartProductsContext)


  return (
    <>
      <BoxStyled>
        <Typography>Valor del pedido</Typography>
        <Typography>{Currency.format(orderSummary.orderValue)}</Typography>
      </BoxStyled>

      <BoxStyled>
        <Typography>Delivery</Typography>
        <Typography>{Currency.format(orderSummary.delivery)}</Typography>
      </BoxStyled>


      <Divider sx={{ mb: 2 }} />

      <BoxStyled>
        <Typography>Total</Typography>
        <Typography>{Currency.format(orderSummary.total)}</Typography>
      </BoxStyled>
    </>
  )
}
