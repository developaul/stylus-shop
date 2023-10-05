import { FC, useRef } from 'react'
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperRef } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import { ProductSlide } from './ProductSlide';
import { SliderButton } from '@/components/Globals/SliderButton';

import { Direction, ShortProduct } from '@/interfaces';
import { productSliderBreakPoints } from '@/constants';

interface Props {
  title: string;
  products: ShortProduct[]
}

export const ProductSlider: FC<Props> = ({ title, products }) => {

  const ref = useRef<SwiperRef | null>(null)

  return (
    <Box
      maxWidth={950}
      sx={{ marginX: 'auto' }}
      display='flex'
      flexDirection='column' >
      <Typography
        variant='h6'
        sx={{ marginBottom: 5 }}
      >{title}</Typography>
      <Box
        sx={{ position: 'relative', height: 380 }}
        maxWidth={950}
      >
        <SliderButton
          direction={Direction.Prev}
          sliderRef={ref}
        />
        <Swiper
          ref={ref}
          style={{ marginRight: 60, marginLeft: 60, height: '100%' }}
          breakpoints={productSliderBreakPoints}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
        >
          {products.map((product) => (
            <ProductSlide
              key={product._id}
              product={product} />
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
