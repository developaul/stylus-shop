import { FC, useCallback, useContext, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ListItem, ListItemAvatar, ListItemButton, ListItemText, Box } from '@mui/material'

import { ProductCounter } from '@/components'
import { CartProductsContext } from '@/context'
import { CartProduct } from '@/interfaces'
import { Currency } from '@/utils'

interface Props {
  product: CartProduct
  enableCounter?: boolean
  onClose?: () => void
}

export const CartListItem: FC<Props> = ({ product, enableCounter = false, onClose }) => {
  const router = useRouter()

  const { updateCartProduct, removeProductFromCart } = useContext(CartProductsContext)

  const price = useMemo(() => Currency.format(product.price * product.quantity), [product.price, product.quantity])

  const handleUpdateCartProduct = useCallback((name: string, value: any) => {
    updateCartProduct({
      ...product,
      [name]: value
    })
  }, [product, updateCartProduct])

  const onRedirect = () => {
    onClose && onClose()
    router.push(`/producto/${product.slug}`)
  }

  return (
    <ListItem
      sx={{ gap: 2 }} >
      {
        enableCounter && (
          <ProductCounter
            size='small'
            value={product.quantity}
            maxValue={product.inStock}
            onChange={handleUpdateCartProduct}
            direction='column'
          />
        )
      }

      <ListItemButton sx={{ gap: 2, width: { xs: 200, md: 400 } }} onClick={onRedirect} >
        <ListItemAvatar>
          <Image
            alt={product.title}
            src={product.image}
            width={80}
            height={100}
          />
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{ sx: { fontSize: { xs: 14, md: 20 } } }}
          primary={product.title}
          secondary={`Cantidad: ${product.quantity}`}
        />
      </ListItemButton>

      <Box>
        <ListItemText
          primaryTypographyProps={{ variant: 'subtitle2', sx: { fontSize: { xs: 10, md: 20 } } }}
          primary={price}
        />
        <ListItemButton
          onClick={() => removeProductFromCart(product)}
        >
          Eliminar
        </ListItemButton>
      </Box>
    </ListItem>
  )
}
