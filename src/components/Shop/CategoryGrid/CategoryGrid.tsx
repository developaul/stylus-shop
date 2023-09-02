import { categories } from '@/constants'
import { Box, Grid, Typography } from '@mui/material'

import { CategoryGridItem } from './CategoryGridItem'


export const CategoryGrid = () => {
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
