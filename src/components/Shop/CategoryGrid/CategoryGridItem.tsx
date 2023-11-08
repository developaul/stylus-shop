import React, { FC } from 'react'
import {
  Card, CardActionArea, CardMedia,
  Grid, Typography
} from '@mui/material'

import { Category } from '@/interfaces'
import { useRouter } from 'next/router'

interface Props {
  category: Category
}

export const CategoryGridItem: FC<Props> = ({ category }) => {

  const router = useRouter()

  const onRedirect = () => {
    router.push(`/${category.slug}`)
  }

  return (
    <Grid
      sx={{ position: 'relative' }}
      xs={12}
      sm={6}
      item>
      <Card sx={{ borderRadius: 2 }} >
        <CardActionArea onClick={onRedirect} >
          <CardMedia
            sx={{ height: 250 }}
            image={category.image}
            title={category.title}
          />
          <Typography
            variant='h6'
            sx={{
              position: 'absolute',
              top: 40,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'grey.100',
            }}
          >
            {category.title}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
