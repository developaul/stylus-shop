import { Box, Grid } from '@mui/material'

import { Service } from './Service'

import { services } from '@/constants'

export const Services = () => {
  return (
    <Box
      maxWidth={950}
      marginX='auto'
    >
      <Grid
        spacing={2}
        container>
        {services.map((service) => (
          <Service
            key={service._id}
            service={service}
          />
        ))}
      </Grid>
    </Box>
  )
}
