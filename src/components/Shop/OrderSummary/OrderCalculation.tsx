import { FC, useContext } from 'react'
import { Box, Divider, Typography, styled } from '@mui/material'
import { CartProductsContext } from '@/context'


import { Currency } from '@/utils'
import { OrderSummary } from '@/interfaces'

const BoxStyled = styled(Box)`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;

  & > p {
    text-align: center;
  }
`

interface Props {
  orderSummary?: OrderSummary
}

export const OrderCalculation: FC<Props> = ({ orderSummary: orderSummaryProp }) => {
  const { orderSummary: orderSummaryContext } = useContext(CartProductsContext)

  const orderSummary = orderSummaryProp ?? orderSummaryContext

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
