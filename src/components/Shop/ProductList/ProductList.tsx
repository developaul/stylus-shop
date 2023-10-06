import { ChangeEvent, FC, useContext, useState } from 'react'
import { Box, CircularProgress, Divider, Grid, Pagination, Stack, Typography } from '@mui/material'

import { ProductFilter } from './ProductFilter'
import { ProductListItem } from './ProductListItem'

import { ProductFilterContext } from '@/context'
import { useProducts } from '@/hooks'

import { Paginate, PreviewProduct, SubCategory } from '@/interfaces'
import { Size } from '@/constants'


interface Props {
  subCategory: SubCategory
  categoryId: string
}

export const ProductList: FC<Props> = ({ subCategory, categoryId }) => {

  const { order, sizeFilter } = useContext(ProductFilterContext)

  const [page, setPage] = useState(1);

  const { result: { docs, info } = {}, isLoading } = useProducts<Paginate<PreviewProduct[]>>({
    url: '/getProducts',
    query: {
      sizes: sizeFilter.includes(Size.All) ? [] : sizeFilter,
      order,
      page,
      limit: 15,
      categoryId: categoryId,
      subCategoryId: subCategory._id
    }
  })

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography sx={{ mb: 4 }} variant='h4' component='h1' >{subCategory.title}</Typography>

      <ProductFilter />

      <Divider sx={{ my: 5 }} />

      {
        isLoading
          ? <CircularProgress /> : (
            <>
              <Grid spacing={4} container>
                {
                  (docs ?? []).map((product) => (
                    <ProductListItem
                      key={product._id}
                      product={product}
                    />
                  ))
                }
              </Grid>

              <Stack
                sx={{ alignItems: 'center', mt: 5 }}
                spacing={2}>
                <Pagination
                  onChange={handleChange}
                  count={info?.pages}
                  page={page}
                  variant="outlined"
                  shape="rounded" />
              </Stack>
            </>
          )
      }
    </Box>
  )
}
