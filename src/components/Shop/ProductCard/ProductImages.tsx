import { FC, useState } from 'react'
import NextImage from 'next/image';
import { Box, Theme, styled, useMediaQuery } from '@mui/material'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

interface Props {
  images: string[]
  title: string
}

const SwiperStyled = styled(Swiper)`
  & .swiper-wrapper {
    justify-content: space-evenly;
  }

  ${props => props.theme.breakpoints.up("sm")} {
    & .swiper-wrapper {
      justify-content: center;
    }
  }

  & .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;

export const ProductImages: FC<Props> = ({ images, title }) => {
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const onSwiper = (thumbsSwiper: SwiperClass) => {
    setThumbsSwiper(thumbsSwiper)
  }

  return (
    <Box>
      <Swiper
        spaceBetween={10}
        loop
        centeredSlides
        zoom
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((image) => (
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }} key={`slide-${image}`}>
            <NextImage
              src={image}
              alt={title}
              width={isDesktop ? 516 : 320}
              height={isDesktop ? 524 : 300}
            />
          </SwiperSlide>
        ))}

      </Swiper>
      <SwiperStyled
        style={{ marginTop: 20 }}
        onSwiper={onSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((image) => (
          <SwiperSlide key={`navigation-${image}`}>
            <NextImage
              src={image}
              alt={title}
              width={95}
              height={96}
            />
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </Box>
  )
}
