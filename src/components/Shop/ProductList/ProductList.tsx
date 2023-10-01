import { FC } from 'react'
import { SubCategory } from '@/interfaces'
import { Box, Divider, Grid, Pagination, Stack, Typography } from '@mui/material'
import { ProductFilter } from './ProductFilter'


interface Props {
  subCategory: SubCategory
}

export const ProductList: FC<Props> = ({ subCategory }) => {
  return (
    <Box>
      <Typography variant='h4' component='h1' >{subCategory.title}</Typography>

      <ProductFilter />

      <Divider />

      <Grid container>

      </Grid>

      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </Box>
  )
}
