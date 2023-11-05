import NextLink from 'next/link'
import { CardMedia, Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Currency } from '@/utils';

export const productColumns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Foto',
    renderCell: ({ row }) => {
      return (
        <Link component={NextLink} href={`/producto/${row.slug}`} target='_blank' rel="noreferrer">
          <CardMedia
            component={'img'}
            alt={row.title}
            className='fadeIn'
            image={row.img}
          />
        </Link>
      )
    }
  },
  {
    field: 'title',
    headerName: 'Titulo',
    width: 250,
    renderCell: ({ row }) => {
      return (
        <Link
          underline='always'
          component={NextLink}
          href={`/admin/productos/${row.slug}`}>
          {row.title}
        </Link>
      )
    }
  },
  { field: 'subCategory', headerName: 'Sub categoria' },
  { field: 'category', headerName: 'Categoria' },
  { field: 'inStock', headerName: 'Inventario' },
  { field: 'price', headerName: 'Precio', renderCell: ({ row }) => Currency.format(row.price) },
  { field: 'sizes', headerName: 'Tallas', width: 250 }
]


export const enum Size {
  'XS' = 'XS',
  'S' = 'S',
  'M' = 'M',
  'L' = 'L',
  'XL' = 'XL',
  'XXL' = 'XXL',
  'XXXL' = 'XXXL',
  'All' = 'Todos'
}

export const SizeEnum = [
  Size.XS,
  Size.S,
  Size.M,
  Size.L,
  Size.XL,
  Size.XXL,
  Size.XXXL,
]