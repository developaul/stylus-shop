import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { ButtonBase, Grid, Typography, styled } from '@mui/material'

import { Category as ICategory } from '@/interfaces'

const ButtonBaseStyled = styled(ButtonBase)`
  padding: 14px 24px;
  border-radius: 10px;
  border: 1px solid #000;
  background-color: #FBFBFB;
  gap: 12px;
`

interface Props {
  category: ICategory
}

export const CategoryListItem: FC<Props> = ({ category }) => {
  const router = useRouter()

  const onRedirect = () => {
    router.push(category.path)
  }

  return (
    <Grid item>
      <ButtonBaseStyled
        sx={{ padding: { xs: 1.5, md: '14px 24px' } }}
        onClick={onRedirect}
      >
        <Image width={32} height={32} src={category.icon} alt={category.title} />
        <Typography sx={{ display: { xs: 'none', md: 'block' } }} >
          {category.title}
        </Typography>
      </ButtonBaseStyled>
    </Grid>
  )
}
