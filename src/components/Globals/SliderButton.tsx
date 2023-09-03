import React, { FC, MutableRefObject, forwardRef, useMemo, } from 'react';
import { IconButton, styled } from '@mui/material'
import { SwiperRef } from 'swiper/react';
import {
  ArrowForwardIosRounded as ArrowForwardIosRoundedIcon,
  ArrowBackIosNewRounded as ArrowBackIosNewRoundedIcon
} from '@mui/icons-material';

import { Direction } from '@/interfaces';

const IconButtonStyled = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid #000;
`

export interface Props {
  direction: Direction,
  sliderRef: MutableRefObject<SwiperRef | null>
}

export const SliderButton: FC<Props> = ({ direction, sliderRef }) => {

  const isNextDirection = useMemo(() => direction === Direction.Next, [direction])

  const onNextSlide = () => {
    if (isNextDirection) {
      sliderRef.current?.swiper.slideNext()
      return
    }

    sliderRef.current?.swiper.slidePrev()
  }

  return (
    <IconButtonStyled
      sx={{ ...isNextDirection ? { right: 0 } : { left: 0 } }}
      onClick={onNextSlide}>
      {isNextDirection ?
        (<ArrowForwardIosRoundedIcon />) :
        (<ArrowBackIosNewRoundedIcon />)}
    </IconButtonStyled>
  )
}