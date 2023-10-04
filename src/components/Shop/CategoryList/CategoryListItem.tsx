import { useMemo, FC } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ButtonBase, Grid, Link, Typography, styled } from '@mui/material'

import { Category as ICategory } from '@/interfaces'

const ButtonBaseStyled = styled(ButtonBase)`
  padding: 14px 24px;
  border-radius: 10px;
  border: 1px solid #000;
  color: #000;
  gap: 12px;
`

interface Props {
  category: ICategory
  categorySlugSelected?: string
}

export const CategoryListItem: FC<Props> = ({ category, categorySlugSelected }) => {
  const { query } = useRouter()

  const isSelected = useMemo(() => {
    if (categorySlugSelected) return categorySlugSelected === category.slug

    return query.categorySlug === category.slug
  }, [category.slug, categorySlugSelected, query.categorySlug])

  return (
    <Grid item>
      <Link
        href={`/${category.slug}`}
        component={NextLink}
      >
        <ButtonBaseStyled
          sx={{ padding: { xs: 1.5, md: '14px 24px' }, backgroundColor: isSelected ? '#E3E3E3' : '#FBFBFB' }}
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
