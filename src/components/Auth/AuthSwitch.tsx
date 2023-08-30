import { useRouter } from 'next/router'
import { useMemo } from 'react';

import { Box, ButtonBase, } from '@mui/material'
import { styled } from '@mui/material/styles';

const BoxStyled = styled(Box)`
  margin: 40px 0;
  background-color: #DFDFDF;
  padding: 6px 10px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

`

const ButtonBaseStyled = styled(ButtonBase)`
  flex: 1;
  padding: 12px 32px;
  border-radius: 30px;
`

export const AuthSwitch = () => {
  const router = useRouter()

  const isSigninPage = useMemo(() => router.pathname === '/signin', [router.pathname])

  const onRedirect = (path: string) => {
    if (router.pathname === path) return

    router.push(path)
  }

  return (
    <BoxStyled>
      <ButtonBaseStyled
        sx={{ backgroundColor: isSigninPage ? '#fff' : 'inherit' }}
        onClick={() => onRedirect('/signin')}>
        Iniciar sesión
      </ButtonBaseStyled>
      <ButtonBaseStyled
        sx={{ backgroundColor: !isSigninPage ? '#fff' : 'inherit' }}
        onClick={() => onRedirect('/register')}>
        Registarse
      </ButtonBaseStyled>
    </BoxStyled>
  )
}
