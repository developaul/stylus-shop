import { FC } from 'react'
import {
  FormControl,

  TextField,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles';

interface Props {
  label: string;
  placeholder: string;
}

const TextFieldStyled = styled(TextField)`
  background-color: #F6F6F6;
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

const FormControlStyled = styled(FormControl)`
  & .MuiFormControl-root {
    border-radius: 14px;
  }
`

export const CustomTextField: FC<Props> = ({ label, placeholder }) => {

  return (
    <FormControlStyled fullWidth>
      <Typography component='label' htmlFor={label} >{label}</Typography>
      <TextFieldStyled
        id={label}
        fullWidth
        margin="dense"
        placeholder={placeholder}
      />
    </FormControlStyled>
  )
}

