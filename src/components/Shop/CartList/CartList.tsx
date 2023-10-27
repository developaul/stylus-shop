import { FC, useContext } from 'react'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'

import { CartListItem } from './CartListItem'

import { CartProductsContext } from '@/context'
import { CartProduct, OrderProduct } from '@/interfaces'

interface Props {
  enableCounter?: boolean
  enableDelete?: boolean
  onClose?: () => void,
  cartProduct?: OrderProduct[]
}

export const CartList: FC<Props> = ({ cartProduct: cartProductProp, onClose, enableCounter = false, enableDelete = false }) => {

  const { cartProducts: cartProductsContext } = useContext(CartProductsContext)

  const cartProducts = cartProductProp ?? cartProductsContext

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <Typography variant='body2'>Producto</Typography>

        <Typography variant='subtitle2' >Precio</Typography>
      </Box>

      <List>
        {
          cartProducts.length ?
            cartProducts.map((product) =>
              <CartListItem
                enableDelete={enableDelete}
                enableCounter={enableCounter}
                key={product.slug}
                product={product as CartProduct} onClose={onClose} />) :
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
