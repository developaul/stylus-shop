import NextLink from 'next/link'
import { Chip, Link } from '@mui/material'
import { GridColDef } from "@mui/x-data-grid"

import { Currency } from '@/utils'

export const enum OrderStatus {
  Pending = 'PENDING',
  Paid = 'PAID',
  Cancelled = 'CANCELLED'
}

export const OrderStatusEnum = [
  OrderStatus.Cancelled,
  OrderStatus.Paid,
  OrderStatus.Pending
]


export const userOrderHistory: GridColDef[] = [
  { field: 'orderId', headerName: 'Id', description: 'Id de la orden', width: 250 },
  {
    field: 'status',
    headerName: 'Estado',
    description: 'Estado de la orden',
    width: 250,
    renderCell: ({ row }) => {
      if (row.status === OrderStatus.Paid)
        return <Chip color="success" label='Pagada' variant='outlined' />

      if (row.status === OrderStatus.Cancelled)
        return <Chip color="error" label='Cancelada' variant='outlined' />

      return <Chip color="warning" label='Pendiente' variant='outlined' />
    }
  },
  {
    field: 'total',
    headerName: 'Total',
    width: 250,
    description: 'Total de la orden',
    renderCell: ({ row }) => Currency.format(row.total)
  },
  {
    field: 'order',
    headerName: 'Ver orden',
    description: 'Ver pagina de la orden',
    width: 250,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <Link component={NextLink} href={`/orden/${row.orderId}`
        } underline='always' >
          Ver orden
        </Link >
      )
    }
  },
];