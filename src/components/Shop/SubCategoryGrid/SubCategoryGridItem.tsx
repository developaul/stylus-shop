import React, { FC } from 'react'
import { useRouter } from 'next/router'
import {
  Card, CardActionArea, CardMedia,
  Grid, Typography
} from '@mui/material'

import { Category, SubCategory } from '@/interfaces'

interface Props {
  subCategory: SubCategory
  category: Category
}

export const SubCategoryGridItem: FC<Props> = ({ category, subCategory }) => {

  const router = useRouter()

  const onRedirect = () => {
    router.push(`/${category.slug}/${subCategory.slug}`)
  }

  return (
    <Grid
      sx={{ position: 'relative' }}
      xs={12}
      sm={4}
      item>
      <Card sx={{ borderRadius: 2 }} >
        <CardActionArea onClick={onRedirect} >
          <CardMedia
            sx={{ height: 250 }}
            image={subCategory.image}
            title={subCategory.title}
          />
          <Typography
            variant='h6'
            sx={{
              position: 'absolute',
              top: '90%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'black'
            }}
          >
            {subCategory.title}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
