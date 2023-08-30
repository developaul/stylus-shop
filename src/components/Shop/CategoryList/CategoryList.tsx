import { Grid } from '@mui/material'

import { CategoryListItem } from './CategoryListItem'

import { categories } from '@/constants'

export const CategoryList = () => {
  return (
    <Grid
      sx={{ marginTop: 5 }}
      justifyContent='center'
      container
      gap={2} >
      {categories.map((category) => (
        <CategoryListItem
          key={category.title}
          category={category}
        />
      ))}
    </Grid>
  )
}
