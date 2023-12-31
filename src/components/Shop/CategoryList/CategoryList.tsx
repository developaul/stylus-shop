import { Grid } from '@mui/material'

import { CategoryListItem } from './CategoryListItem'

import { Category } from '@/interfaces'
import { FC } from 'react'

interface Props {
  categories: Category[]
  categorySlugSelected?: string
}

export const CategoryList: FC<Props> = ({ categories, categorySlugSelected }) => {
  return (
    <Grid
      sx={{ marginTop: 5 }}
      justifyContent='center'
      container
      gap={2} >
      {categories.map((category) => (
        <CategoryListItem
          key={category.title}
          categorySlugSelected={categorySlugSelected}
          category={category}
        />
      ))}
    </Grid>
  )
}
