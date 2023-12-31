import { FC } from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

const ButtonStyled = styled(Button)`
  border-color: #C8C8C8;
  background-color: #FFF;
  color: #000;
  border-radius: 30px;
  text-transform: capitalize;
  font-weight: 400;
  padding: 8px 40px;
`

interface Props extends ButtonProps {

}

export const CustomButton: FC<Props> = (props) => {
  return (
    <ButtonStyled
      {...props}
    />
  )
}
