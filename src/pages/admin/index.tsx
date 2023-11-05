import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Grid } from '@mui/material';
import {
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  AttachMoneyOutlined as AttachMoneyOutlinedIcon,
  CancelPresentationOutlined as CancelPresentationOutlinedIcon,
  CategoryOutlined as CategoryOutlinedIcon,
  CreditCardOffOutlined as CreditCardOffOutlinedIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  GroupOutlined as GroupOutlinedIcon,
  ProductionQuantityLimitsOutlined as ProductionQuantityLimitsOutlinedIcon
} from '@mui/icons-material';

import { AdminLayout } from "@/components/Layouts"
import { SummaryCard, SummaryCardSkeleton } from '@/components/Admin'
import { DashboardInfo } from '@/interfaces';

const AdminPage: NextPage = () => {

  const { data, isLoading } = useSWR<DashboardInfo>('/api/admin/dashboard', { refreshInterval: 30 * 1000 })
  const [refreshIn, setRefreshIn] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => setRefreshIn(prev => prev > 0 ? prev - 1 : 30), 1000)

    return () => clearInterval(interval)
  }, [])

  const {
    numberOfOrders, paidOrders, notPaidOrders, numberOfClients,
    numberOfProducts, productsWithNoInventory, lowInventory
  } = data! ?? {}

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlinedIcon />}
    >
      <Grid container spacing={2}>
        {isLoading ? (
          <>
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
          </>
        ) : (
          <>
            <SummaryCard title={numberOfOrders} subTitle='Ordenes totales' icon={<CreditCardOffOutlinedIcon color='secondary' sx={{ fontSize: 40 }} />} />
            <SummaryCard title={paidOrders} subTitle='Ordenes pagadas' icon={<AttachMoneyOutlinedIcon color='success' sx={{ fontSize: 40 }} />} />
            <SummaryCard title={notPaidOrders} subTitle='Ordenes pendientes' icon={<CreditCardOffOutlinedIcon color='error' sx={{ fontSize: 40 }} />} />
            <SummaryCard title={numberOfClients} subTitle='Clientes' icon={<GroupOutlinedIcon color='primary' sx={{ fontSize: 40 }} />} />
            <SummaryCard title={numberOfProducts} subTitle='Productos' icon={<CategoryOutlinedIcon color='warning' sx={{ fontSize: 40 }} />} />
            <SummaryCard title={productsWithNoInventory} subTitle='Sin Existencias' icon={<CancelPresentationOutlinedIcon color='error' sx={{ fontSize: 40 }} />} />
            <SummaryCard title={lowInventory} subTitle='Bajo inventario' icon={<ProductionQuantityLimitsOutlinedIcon color='warning' sx={{ fontSize: 40 }} />} />
            <SummaryCard title={refreshIn} subTitle='Actualizacion en:' icon={<AccessTimeOutlinedIcon color='secondary' sx={{ fontSize: 40 }} />} />
          </>
        )}
      </Grid>
    </AdminLayout>
  )
}

export default AdminPage 