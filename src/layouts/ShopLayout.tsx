import { FC, ReactElement } from 'react'
import Head from 'next/head'
import { Container } from '@mui/material'

import { Header } from '@/components'

interface Props {
  children: ReactElement | ReactElement[]
  title: string
}

export const ShopLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Container
        sx={{ paddingTop: 2 }}
        maxWidth='xl'>
        <Header />

        {children}
      </Container>
    </>
  )
}
