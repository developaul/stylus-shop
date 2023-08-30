import { FC, ReactElement } from 'react'
import { Box, Container } from '@mui/material'

import { AuthSwitch, Logo } from '@/components'
import Head from 'next/head'

interface Props {
  children: ReactElement | ReactElement[]
  title: string
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container
        sx={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
        maxWidth='sm'>

        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'>
          <Logo />
        </Box>

        <AuthSwitch />

        {children}


      </Container>
    </>
  )
}
