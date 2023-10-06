import { FC, useCallback, useContext, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'

import { ProductCounter } from '@/components'
import { CartProductsContext } from '@/context'
import { CartProduct } from '@/interfaces'
import { Currency } from '@/utils'

interface Props {
  product: CartProduct
  onClose: () => void
}

export const CartListItem: FC<Props> = ({ product, onClose }) => {
  const router = useRouter()

  const { updateCartProduct } = useContext(CartProductsContext)

  const price = useMemo(() => Currency.format(product.price * product.quantity), [product.price, product.quantity])

  const handleUpdateCartProduct = useCallback((name: string, value: any) => {
    updateCartProduct({
      ...product,
      [name]: value
    })
  }, [product, updateCartProduct])

  const onRedirect = () => {
    onClose()
    router.push(`/producto/${product.slug}`)
  }

  return (
    <ListItem sx={{ gap: 2 }} >
      <ProductCounter
        size='small'
        value={product.quantity}
        maxValue={product.inStock}
        onChange={handleUpdateCartProduct}
        direction='column'
      />

      <ListItemButton sx={{ gap: 2, width: 400 }} onClick={onRedirect} >
        <ListItemAvatar>
          <Image
            alt={product.title}
            src={product.image}
            width={80}
            height={100}
          />
        </ListItemAvatar>
        <ListItemText
          primary={product.title}
          secondary={`Cantidad: ${product.quantity}`}
        />
      </ListItemButton>

      <ListItemText
        primaryTypographyProps={{ variant: 'subtitle2' }}
        primary={price}
      />
    </ListItem>
  )
}
