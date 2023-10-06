import { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { Product } from '@/interfaces'
import { ProductImages } from './ProductImages'
import { ProductConfig } from './ProductConfig'

interface Props {
  product: Product
}

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        sx={{ mb: 6 }}
        variant='h5'
        component='h2'
      >
        {product.category.title} / {product.title}
      </Typography>

      <Grid spacing={6} container>
        <Grid xs={12} md={7} item>
          <ProductImages
            images={product.images}
            title={product.title} />
        </Grid>

        <Grid xs={12} md={5} item>
          <ProductConfig product={product} />
        </Grid>
      </Grid>
    </Box>
  )
}
