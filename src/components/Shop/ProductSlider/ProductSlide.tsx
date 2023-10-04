import { FC } from 'react'
import { useRouter } from 'next/router'
import { SwiperSlide } from 'swiper/react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'

import { Product as IProduct } from '@/interfaces'

interface Props {
  product: Pick<IProduct, '_id' | 'images' | 'title' | 'slug'>
}

export const ProductSlide: FC<Props> = ({ product }) => {
  const router = useRouter()

  const onRedirect = () => {
    router.push(`/producto/${product.slug}`)
  }

  return (
    <SwiperSlide>
      <Card sx={{ maxWidth: 200, margin: '0 auto' }}>
        <CardActionArea onClick={onRedirect}>
          <CardMedia
            component={'img'}
            height={220}
            image={product.images[0]}
            alt={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </SwiperSlide>
  )
}

ProductSlide.displayName = 'SwiperSlide'
