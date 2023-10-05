import { FC, useState } from 'react'
import { Box, Button, Divider, Typography, styled } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

import { ProductCounter } from '@/components'
import { CartProduct, Product } from '@/interfaces'
import { Currency } from '@/utils'
import { SelectSize } from '@/components/Globals/Product/SelectSize';

interface Props {
  product: Product
}

const BoxStyled = styled(Box)`
  display: flex;
  align-items: center;
`

export const ProductConfig: FC<Props> = ({ product }) => {

  const [tempProduct, setTempProduct] = useState<CartProduct>({
    _id: product._id,
    image: product.images[0],
    inStock: product.inStock,
    price: product.price,
    slug: product.slug,
    title: product.title,
    quantity: 0,
    size: undefined
  })

  const onChange = (name: string, value: any) => {
    setTempProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Box>
      <Box>
        <Typography>{product.title}</Typography>
      </Box>

      <Typography>{Currency.format(product.price)}</Typography>

      <Typography>Disponibles: {product.inStock}</Typography>

      <SelectSize
        sizes={product.sizes}
        value={tempProduct.size}
        onChange={onChange}
      />

      <Box>
        <Typography>Cambios y devoluciones</Typography>
        <ErrorOutlineIcon />
      </Box>

      <BoxStyled>
        <AutorenewRoundedIcon sx={{ mr: 2 }} />
        <Typography>Un cambio gratis.</Typography>
      </BoxStyled>

      <BoxStyled>
        <HttpsRoundedIcon sx={{ mr: 2 }} />
        <Typography>Tu compra e información es 100% segura.</Typography>
      </BoxStyled>

      <BoxStyled>
        <Inventory2RoundedIcon sx={{ mr: 2 }} />
        <Typography>Envíos a todo el Perú.</Typography>
      </BoxStyled>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <ProductCounter />

        <Button>
          Añadir a carrito
        </Button>
      </Box>
    </Box>
  )
}
