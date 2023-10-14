import { FC, useCallback, useContext, useMemo, useState } from 'react'
import { Box, Button, Divider, IconButton, Typography, styled } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

import { ProductCounter, SelectSize } from '@/components'
import { FavoriteProductsContext, CartProductsContext } from '@/context';
import { CartProduct, Product } from '@/interfaces'
import { Currency } from '@/utils'

interface Props {
  product: Product
}

const BoxStyled = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const ButtonStyled = styled(Button)(
  ({ theme }) => `
  text-transform: capitalize;
  font-weight: 400;
  color: ${theme.palette.grey[800]};
  border-color: ${theme.palette.grey[800]};
  border-radius: 50px;

  &:hover {
    border-color: ${theme.palette.grey[800]};
    background-color: ${theme.palette.common.white}
  }
`)

export const ProductConfig: FC<Props> = ({ product }) => {

  const { favoriteProducts, addFavoriteProduct, removeFavoriteProduct } = useContext(FavoriteProductsContext)
  const { addProductToCart } = useContext(CartProductsContext)

  const [tempProduct, setTempProduct] = useState<CartProduct>({
    _id: product._id,
    image: product.images[0],
    inStock: product.inStock,
    price: product.price,
    slug: product.slug,
    title: product.title,
    quantity: 1,
    size: undefined
  })

  const onChange = useCallback((name: string, value: any) => {
    setTempProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const isFavoriteProduct = useMemo(() => favoriteProducts
    .some(favoriteProduct => favoriteProduct._id === product._id), [favoriteProducts, product._id]
  )

  const handleAddFavoriteProduct = () => {
    const { _id, images, slug, title } = product

    addFavoriteProduct({
      _id,
      image: images[0],
      slug,
      title
    })
  }

  const handleAddCartProduct = () => {
    addProductToCart(tempProduct)
    setTempProduct(prev => ({ ...prev, quantity: 1, size: undefined }))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Typography
          component='h1'
          variant='h5' >
          {product.title}
        </Typography>

        {
          isFavoriteProduct ?
            (
              <IconButton
                sx={{
                  border: `2px solid`,
                  borderColor: 'error.300',
                  color: 'error.300',
                  backgroundColor: 'error.300',
                  '&:hover': {
                    backgroundColor: 'error.300',
                  }
                }}
                onClick={() => removeFavoriteProduct(product._id)}
                size='medium' >
                <FavoriteBorderRoundedIcon sx={{ color: 'common.white' }} fontSize='medium' />
              </IconButton>
            )
            :
            (
              <IconButton
                onClick={handleAddFavoriteProduct}
                sx={{ border: `2px solid`, borderColor: 'error.300', color: 'error.300', }}
                size='medium' >
                <FavoriteBorderRoundedIcon fontSize='medium' />
              </IconButton>
            )
        }
      </Box>

      <Typography sx={{ mb: 0.5 }} variant='subtitle2' >{Currency.format(product.price)}</Typography>

      <Typography variant='body1' >Disponibles: {product.inStock}</Typography>

      <SelectSize
        sizes={product.sizes}
        value={tempProduct.size}
        onChange={onChange}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <Typography sx={{ fontWeight: 800 }} variant='subtitle1' >Cambios y devoluciones</Typography>
        <ErrorOutlineIcon fontSize='large' />
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

      <Divider sx={{ my: 4 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <ProductCounter
          value={tempProduct.quantity}
          onChange={onChange}
          maxValue={tempProduct.inStock}
        />

        <ButtonStyled
          onClick={handleAddCartProduct}
          disabled={!tempProduct.size}
          size='large'
          variant='outlined'
          startIcon={<ShoppingCartOutlinedIcon fontSize='large' />}
        >
          Añadir a carrito
        </ButtonStyled>
      </Box>
    </Box>
  )
}
