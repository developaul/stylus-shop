import { FC, memo } from 'react'
import { Box, ButtonBase, Typography, styled } from '@mui/material'

interface Props {
  value: number;
  maxValue: number;
  onChange: (name: string, value: any) => void
}

const ButtonBaseStyled = styled(ButtonBase)`
  width: 50px;
  height: 50px;
  font-size: 24px;
  background-color: #EFEFEF;
`

const ProductCounter: FC<Props> = ({ value, maxValue, onChange }) => {

  const handleIncrease = () => {
    const newValue = Math.min(maxValue, value + 1)

    onChange('quantity', newValue)
  }

  const handleDecrease = () => {
    const newValue = Math.max(1, value - 1)

    onChange('quantity', newValue)
  }


  return (
    <Box sx={{ display: 'flex', alignItems: 'center', border: `1px solid #EFEFEF`, borderRadius: '50%' }} >
      <ButtonBaseStyled
        onClick={handleIncrease}
        sx={{ borderTopLeftRadius: '50%', borderBottomLeftRadius: '50%' }}>
        +
      </ButtonBaseStyled>
      <Typography
        sx={{
          width: 50,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {value}
      </Typography>
      <ButtonBaseStyled
        onClick={handleDecrease}
        sx={{ borderTopRightRadius: '50%', borderBottomRightRadius: '50%' }}>
        -
      </ButtonBaseStyled>
    </Box>
  )
}

export default memo(ProductCounter)