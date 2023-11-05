import { useMemo } from 'react'
import useSWR from 'swr'
import {
  CategoryOutlined as CategoryOutlinedIcon,
  AddOutlined as AddOutlinedIcon
} from '@mui/icons-material'
import { Box, Button, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { AdminLayout } from '@/components/Layouts'

import { productColumns } from '@/constants'
import { Product } from '@/interfaces'

const ProductsPage = () => {
  const { data, isLoading } = useSWR<Product[]>('/api/admin/products')

  const rows = useMemo(() => {
    return (data ?? []).map((product) => {
      const { _id, images, title, inStock, price, sizes, slug, category, subCategory } = product

      return {
        id: _id,
        img: images[0],
        title,
        subCategory: subCategory.title,
        category: category.title,
        inStock,
        price,
        sizes: sizes.join(', '),
        slug
      }
    })
  }, [data])

  if (isLoading) return <></>

  return (
    <AdminLayout
      title='Productos'
      subTitle='Mantenimiento de productos'
      icon={<CategoryOutlinedIcon />}
    >
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        <Button
          startIcon={<AddOutlinedIcon />}
          color='secondary'
          href='/admin/products/new'>
          Crear producto
        </Button>
      </Box>
      <Grid className='fadeIn' container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={productColumns}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 }
              },
            }}
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default ProductsPage