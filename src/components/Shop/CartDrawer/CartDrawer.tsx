import { useRouter } from 'next/router';
import { FC, useContext } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material';

import { CartList } from '../CartList';

import { CartProductsContext } from '@/context'
import { Currency } from '@/utils';

interface Props {
  onClose: () => void
}

export const CartDrawer: FC<Props> = ({ onClose }) => {
  const router = useRouter()

  const { cartProducts, orderSummary } = useContext(CartProductsContext)

  const onRedirect = () => {
    onClose()
    router.push('/carrito')
  }

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

      <CartList enableDelete enableCounter onClose={onClose} />

      {
        Boolean(cartProducts.length) && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <Typography variant='body2' >Total: </Typography>
              <Typography variant='subtitle2'>{Currency.format(orderSummary.orderValue)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
              <Button onClick={onRedirect} variant='contained' >
                Continuar con la compra
              </Button>
            </Box>
          </>
        )
      }

    </Box>
  )
}
