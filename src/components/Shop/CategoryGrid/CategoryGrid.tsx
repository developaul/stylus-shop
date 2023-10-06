import { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { CategoryGridItem } from './CategoryGridItem'

import { Category } from '@/interfaces'

interface Props {
  categories: Category[]
}

export const CategoryGrid: FC<Props> = ({ categories }) => {
  return (
    <Box
      maxWidth={950}
      sx={{ margin: '40px auto' }}
      display='flex'
      flexDirection='column'
    >
      <Typography
        variant='h6'
        component='h3'
        sx={{ marginBottom: 5 }}
      >Categorías</Typography>

      <Grid
        sx={{ paddingX: { xs: 0, md: 7.5 } }}
        spacing={2}
        container>
        {categories.map((category) => (
          <CategoryGridItem
            key={category._id}
            category={category}
          />
        ))}
      </Grid>
    </Box >
  )
}
