import { FC, useContext } from 'react'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'

import { CartListItem } from './CartListItem'

import { CartProductsContext } from '@/context'

interface Props {
  enableCounter?: boolean
  enableDelete?: boolean
  onClose?: () => void
}

export const CartList: FC<Props> = ({ onClose, enableCounter = false, enableDelete = false }) => {

  const { cartProducts } = useContext(CartProductsContext)

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <Typography variant='body2'>Producto</Typography>

        <Typography variant='subtitle2' >Precio</Typography>
      </Box>

      <List>
        {
          cartProducts.length ?
            cartProducts.map((product) => <CartListItem enableDelete={enableDelete} enableCounter={enableCounter} key={product._id} product={product} onClose={onClose} />) :
            (
              <ListItem>
                <ListItemText primary={'No hay productos en el carrito aun...'} />
              </ListItem>
            )
        }
      </List>
    </Box>
  )
}
