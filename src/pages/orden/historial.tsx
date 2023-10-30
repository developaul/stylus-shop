import { GetServerSideProps, NextPage } from 'next';
import React, { useMemo } from 'react'
import { getServerSession } from 'next-auth';
import { Typography } from '@mui/material'
import { DataGrid, } from '@mui/x-data-grid';

import { ShopLayout } from '@/components'

import { authOptions } from '../api/auth/[...nextauth]';
import { getOrdersByUserId } from '@/server';
import { ShortOrder } from '@/interfaces';
import { userOrderHistory } from '@/constants';


interface Props {
  orders: ShortOrder[]
}


const HistorialPage: NextPage<Props> = ({ orders }) => {

  const rows = useMemo(() => {
    return orders.map((order, index) => {
      const { orderSummary, status, _id } = order
      const { total } = orderSummary

      return {
        orderId: _id,
        id: _id,
        status,
        total
      }
    })
  }, [orders])

  return (
    <ShopLayout title='asd'>
      <Typography sx={{ my: 5 }} variant='h4' component='h1'>Historial de pedidos:</Typography>

      <DataGrid
        rows={rows}
        columns={userOrderHistory}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 }
          },
        }}
        pageSizeOptions={[10]}
      />
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  const orders = await getOrdersByUserId(session!.user._id!)

  return {
    props: {
      orders
    }
  }
}

export default HistorialPage