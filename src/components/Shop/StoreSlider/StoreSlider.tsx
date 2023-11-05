import { FC, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { Swiper, SwiperRef } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules';

import { StoreSlide } from './StoreSlide';
import { SliderButton } from '@/components/Globals';

import { storeSliderBreakPoints } from '@/constants';
import { Direction, Store } from '@/interfaces';

interface Props {
  stores: Store[]
}

export const StoreSlider: FC<Props> = ({ stores }) => {

  const ref = useRef<SwiperRef | null>(null)

  return (
    <Box
      maxWidth={950}
      sx={{ margin: '100px auto' }}
      display='flex'
      flexDirection='column' >
      <Typography
        variant='subtitle1'
        textAlign='center'>
        Tiendas
      </Typography>

      <Box
        sx={{ position: 'relative', marginTop: 4 }}
        maxWidth={950}
      >
        <SliderButton
          direction={Direction.Prev}
          sliderRef={ref}
        />
        <Swiper
          ref={ref}
          style={{ marginRight: 60, marginLeft: 60 }}
          breakpoints={storeSliderBreakPoints}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
        >
          {stores.map((store) => (
            <StoreSlide
              key={store._id}
              store={store} />
          ))}
        </Swiper>
        <SliderButton
          direction={Direction.Next}
          sliderRef={ref}
        />
      </Box>
    </Box>
  )
}
