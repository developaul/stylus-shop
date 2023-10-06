import { FC, useContext } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { CartProductsContext } from '@/context'

import { CartList } from '../CartList';
import { Currency } from '@/utils';

interface Props {
  onClose: () => void
}

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

            <Button sx={{}} variant='contained' >
              Continuar con la compra
            </Button>
          </>
        )
      }

    </Box>
  )
}
