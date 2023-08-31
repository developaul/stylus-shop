import { FC } from 'react'
import { SwiperSlide } from 'swiper/react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'

import { Product as IProduct } from '@/interfaces'

interface Props {
  product: IProduct
}

export const ProductSlide: FC<Props> = ({ product }) => {
  return (
    <SwiperSlide>
      <Card sx={{ maxWidth: 200, margin: '0 auto' }}>
        <CardActionArea>
          <CardMedia
            component={'img'}
            height={220}
            image={product.image}
            alt={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.category.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </SwiperSlide>
  )
}

ProductSlide.displayName = 'SwiperSlide'
