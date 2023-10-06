import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Card, CardActionArea, CardContent, CardMedia, Grid, Tooltip, Typography, styled } from '@mui/material'

import { PreviewProduct } from '@/interfaces'
import { Currency } from '@/utils'

interface Props {
  product: PreviewProduct
}

const TypographyStyled = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const ProductListItem: FC<Props> = ({ product }) => {
  const router = useRouter()

  const onRedirect = () => {
    router.push(`/producto/${product.slug}`)
  }

  return (
    <Grid xs={12} sm={6} md={4} lg={3} item>
      <Card>
        <CardActionArea onClick={onRedirect} >
          <CardMedia
            component={'img'}
            height={420}
            image={product.images[0]}
            alt={product.title}
          />
          <CardContent>
            <Tooltip title={product.title}>
              <TypographyStyled>{product.title}</TypographyStyled>
            </Tooltip>
            <Typography>{Currency.format(product.price)}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
