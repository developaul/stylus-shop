import { FC } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { ButtonBase, Grid, Link, Typography, styled } from '@mui/material'

import { Category as ICategory } from '@/interfaces'

const ButtonBaseStyled = styled(ButtonBase)`
  padding: 14px 24px;
  border-radius: 10px;
  border: 1px solid #000;
  background-color: #FBFBFB;
  color: #000;
  gap: 12px;
`

interface Props {
  category: ICategory
}

export const CategoryListItem: FC<Props> = ({ category }) => {

  return (
    <Grid item>
      <Link
        href={`/categoria/${category.slug}`}
        component={NextLink}
      >
        <ButtonBaseStyled
          sx={{ padding: { xs: 1.5, md: '14px 24px' } }}
        >
          <Image width={32} height={32} src={category.icon} alt={category.title} />
          <Typography sx={{ display: { xs: 'none', md: 'block' } }} >
            {category.title}
          </Typography>
        </ButtonBaseStyled>
      </Link>
    </Grid>
  )
}
