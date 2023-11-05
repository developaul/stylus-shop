import { NextPage } from 'next';
import useSWR from 'swr';
import { useMemo } from 'react';
import { Grid } from '@mui/material';
import { DashboardOutlined as DashboardOutlinedIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

import { AdminLayout } from "@/components/Layouts"

import { adminOrderHistory } from '@/constants';
import { ShortOrder } from '@/interfaces';
import { User } from '@/utils';


const OrdersPage: NextPage = () => {
  const { data, isLoading, } = useSWR<ShortOrder[]>('/api/admin/orders')

  const rows = useMemo(() =>
    (data ?? []).map(({ _id, createdAt, orderProducts, orderSummary, shippingAddress, status, createdBy }) => {
      const { firstName, lastName } = createdBy ?? {}
      const { email } = shippingAddress
      const { total } = orderSummary

      return {
        id: _id,
        name: User.getFullName({ firstName, lastName }),
        email,
        total,
        status,
        inStock: orderProducts.length,
        createdAt
      }
    }), [data])

  if (isLoading) return <></>

  return (
    <AdminLayout
      title="Ordenes"
      subTitle="Mantenimiento de ordenes"
      icon={<DashboardOutlinedIcon />}
    >
      <Grid className='fadeIn' container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={adminOrderHistory}
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

export default OrdersPage 