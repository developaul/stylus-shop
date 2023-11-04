import React, { FC } from 'react'
import { Card, CardContent, Grid, Skeleton } from '@mui/material';

export const SummaryCardSkeleton: FC = () => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ display: 'flex', height: 120 }}>
        <CardContent sx={{ width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Skeleton variant="circular" width={40} height={40} />
        </CardContent>
        <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

          <Skeleton variant="rectangular" width={210} height={10} />

          <Skeleton sx={{ mt: 1 }} variant="rectangular" width={210} height={10} />
        </CardContent>
      </Card>
    </Grid>)
}
