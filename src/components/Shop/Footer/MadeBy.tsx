import NextLink from 'next/link'
import { Link, Typography } from '@mui/material'
import { FavoriteRounded as FavoriteRoundedIcon } from '@mui/icons-material'


export const MadeBy = () => {
  return (
    <Typography display='flex' alignItems='center'>
      Hecho por&nbsp;
      <Link
        target='_blank'
        color='secondary'
        underline='hover'
        component={NextLink}
        href='https://github.com/developaul'>
        @developaul
      </Link>&nbsp;
      con&nbsp;<FavoriteRoundedIcon color='secondary' /> </Typography>
  )
}
