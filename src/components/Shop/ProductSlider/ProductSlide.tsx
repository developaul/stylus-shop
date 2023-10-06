import { FC } from 'react'
import { useRouter } from 'next/router'
import { SwiperSlide } from 'swiper/react'
import { Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography, styled } from '@mui/material'

import { Product as IProduct } from '@/interfaces'

interface Props {
  product: Pick<IProduct, '_id' | 'images' | 'title' | 'slug'>
}

const TypographyStyled = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const ProductSlide: FC<Props> = ({ product }) => {
  const router = useRouter()

  const onRedirect = () => {
    router.push(`/producto/${product.slug}`)
  }

  return (
    <SwiperSlide>
      <Card sx={{ maxWidth: 200, margin: '0 auto', height: 280 }}>
        <CardActionArea onClick={onRedirect}>
          <CardMedia
            component={'img'}
            height={220}
            image={product.images[0]}
            alt={product.title}
          />
          <CardContent>
            <Tooltip title={product.title}>
              <TypographyStyled variant="body1">
                {product.title}
              </TypographyStyled>
            </Tooltip>
          </CardContent>
        </CardActionArea>
      </Card>
    </SwiperSlide>
  )
}

ProductSlide.displayName = 'SwiperSlide'
