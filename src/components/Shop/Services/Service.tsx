import { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { Service as IService } from '@/interfaces'

interface Props {
  service: IService
}

export const Service: FC<Props> = ({ service }) => {

  const { Icon, title, description } = service

  return (
    <Grid
      alignItems='center'
      display='flex'
      flexDirection='column'
      xs={6}
      md={4}
      item>
      <Icon
        fontSize='large'
      />
      <Box
        marginTop={2.5}
        maxWidth={200}
        textAlign='center'
      >
        <Typography variant='subtitle2'>{title}</Typography>

        <Typography
          marginTop={1.5}
          variant='body2'>{description}</Typography>
      </Box>
    </Grid >
  )
}
