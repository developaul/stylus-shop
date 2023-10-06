import { FC, useContext } from 'react'
import { Box, Button, IconButton, Typography, styled } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { CartProductsContext } from '@/context'

import { CartList } from '../CartList';
import { Currency } from '@/utils';

interface Props {
  onClose: () => void
}

const ButtonStyled = styled(Button)(
  ({ theme }) => `
  text-transform: none;
  font-weight: 400;
  background-color: ${theme.palette.grey[400]};
  border-color: ${theme.palette.grey[400]};
  color: ${theme.palette.common.black};
  border-radius: 50px;

  &:hover {
    border-color: ${theme.palette.grey[400]};
    background-color: ${theme.palette.grey[400]};
  }
`)


export const CartDrawer: FC<Props> = ({ onClose }) => {

  const { cartProducts, orderSummary } = useContext(CartProductsContext)

  return (
    <Box>
      <IconButton sx={{ ml: 2, mt: 2 }} onClick={onClose} >
        <CloseIcon />
      </IconButton>

      <Typography
        sx={{ textAlign: 'center', mt: 2 }}
        variant='h6'>
        Carrito ({cartProducts.length})
      </Typography>

      <CartList onClose={onClose} />

      {
        Boolean(cartProducts.length) && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <Typography variant='body2' >Total: </Typography>
              <Typography variant='subtitle2'>{Currency.format(orderSummary.orderValue)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
              <ButtonStyled variant='contained' >
                Continuar con la compra
              </ButtonStyled>
            </Box>
          </>
        )
      }

    </Box>
  )
}
