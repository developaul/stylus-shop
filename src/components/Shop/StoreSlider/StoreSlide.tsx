import { FC } from 'react'

import { Store } from '@/interfaces'
import { SwiperSlide } from 'swiper/react'
import { Card, CardActionArea, CardMedia, styled } from '@mui/material'

const CardStyled = styled(Card)`
  border-radius: 26px;
  border: 1px solid #000;
  maxWidth: 200px;
  margin: 0 auto;
`

interface Props {
  store: Store
}

export const StoreSlide: FC<Props> = ({ store }) => {
  return (
    <SwiperSlide>
      <CardStyled>
        <CardActionArea
          sx={{ padding: '10px 20px' }}
        >
          <CardMedia
            component={'img'}
            image={store.image}
            alt={store.title}
          />
        </CardActionArea>
      </CardStyled>
    </SwiperSlide>
  )
}

StoreSlide.displayName = 'SwiperSlide'
