import React, { FC } from 'react'
import { Box, Grid, Typography, styled } from '@mui/material'

import { Category } from '@/interfaces'

const BoxStyled = styled(Box)`
  border-radius: 24px;
  width: 100%;
  height: 300px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

interface Props {
  category: Category
}

export const CategoryGridItem: FC<Props> = ({ category }) => {
  return (
    <Grid
      sx={{ position: 'relative' }}
      xs={12}
      sm={6}
      item>
      <BoxStyled
        sx={{
          backgroundImage: `url(${category.image})`,
        }}
      />

      <Typography
        variant='h6'
        sx={{
          position: 'absolute',
          top: '90%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white'
        }}
      >
        {category.title}
      </Typography>
    </Grid>
  )
}
