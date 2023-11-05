import Head from 'next/head'
import { FC, ReactElement } from 'react'
import { Box, Container, Typography } from '@mui/material'

import { MadeBy, Header } from '@/components/Shop'

interface Props {
  children: ReactElement | ReactElement[]
  title: string
  subTitle: string
  icon?: JSX.Element
}

export const AdminLayout: FC<Props> = ({ children, title, icon, subTitle }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Container
        component='main'
        sx={{ paddingTop: 2 }}
        maxWidth='xl'>
        <Header />

        <Box sx={{ mt: 4 }} display='flex' flexDirection='column'>
          <Typography variant='h1' component='h1'>
            {icon}
            {' '} {title}
          </Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }} className='fadeIn'>
          {children}
        </Box>

        <Box sx={{ my: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MadeBy />
        </Box>
      </Container>
    </>
  )
}
