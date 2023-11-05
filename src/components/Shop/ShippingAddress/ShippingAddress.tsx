import { FC } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, styled } from '@mui/material'

import { ShippingAddress as IShippingAddress } from '@/interfaces'

const BoxStyled = styled(Box)`
  grid-template-columns: 100px 1fr;
  display: grid;
  align-items: center;
`

interface Props {
  shippingAddress: IShippingAddress
}

export const ShippingAddress: FC<Props> = ({ shippingAddress }) => {
  const { query } = useRouter()

  const { address, city, country, email, phone, zipCode } = shippingAddress

  return (
    <Box>
      <Typography component='h1' variant='h4'>Orden: {query.id}</Typography>

      <Typography sx={{ mt: 6 }} component='h2' variant='h5'>Informacion de envio:</Typography>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <BoxStyled>
          <Typography variant='subtitle2'>Pais:</Typography>
          <Typography variant='body2' >{country}</Typography>
        </BoxStyled>
        <BoxStyled>
          <Typography variant='subtitle2'>Ciudad:</Typography>
          <Typography variant='body2'>{city}</Typography>
        </BoxStyled>
        <BoxStyled>
          <Typography variant='subtitle2'>Direccion:</Typography>
          <Typography variant='body2'>{address}</Typography>
        </BoxStyled>
        <BoxStyled>
          <Typography variant='subtitle2'>Email:</Typography>
          <Typography variant='body2'>{email}</Typography>
        </BoxStyled>
        <BoxStyled>
          <Typography variant='subtitle2'>Celular:</Typography>
          <Typography variant='body2'>{phone}</Typography>
        </BoxStyled>

        <BoxStyled>
          <Typography variant='subtitle2'>Codigo zip:</Typography>
          <Typography variant='body2'>{zipCode}</Typography>
        </BoxStyled>
      </Box>
    </Box >
  )
}
