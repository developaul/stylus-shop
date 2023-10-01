import { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { SubCategoryGridItem } from './SubCategoryGridItem'

import { Category, SubCategory } from '@/interfaces'

interface Props {
  subCategories: SubCategory[]
  category: Category
}

export const SubCategoryGrid: FC<Props> = ({ category, subCategories }) => {
  return (
    <Box
      maxWidth={950}
      sx={{ margin: '100px auto' }}
      display='flex'
      flexDirection='column'
    >
      <Typography
        variant='h6'
        sx={{ marginBottom: 5 }}
      >
        Subcategorías
      </Typography>

      <Grid
        sx={{ paddingX: { xs: 0, md: 7.5 } }}
        spacing={2}
        container>
        {subCategories.map((subCategory) => (
          <SubCategoryGridItem
            category={category}
            key={subCategory._id}
            subCategory={subCategory}
          />
        ))}
      </Grid>
    </Box >
  )
}
