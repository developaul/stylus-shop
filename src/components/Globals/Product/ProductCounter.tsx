import { FC, memo } from 'react'
import { Box, ButtonBase, Typography, styled } from '@mui/material'

interface Props {
  value: number;
  maxValue: number;
  direction?: 'row' | 'column';
  size?: 'medium' | 'small'
  onChange: (name: string, value: any) => void;
}

const ButtonBaseStyled = styled(ButtonBase)`
  font-size: 24px;
  background-color: #EFEFEF;
`

const ProductCounter: FC<Props> = ({
  value, maxValue, direction = 'row',
  size = 'medium', onChange
}) => {

  const handleIncrease = () => {
    const newValue = Math.min(maxValue, value + 1)

    onChange('quantity', newValue)
  }

  const handleDecrease = () => {
    const newValue = Math.max(1, value - 1)

    onChange('quantity', newValue)
  }


  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      border: `1px solid #EFEFEF`,
      borderRadius: '50%',
      flexDirection: direction
    }} >
      <ButtonBaseStyled
        onClick={handleIncrease}
        sx={{
          ...direction === 'row'
            ? { borderTopLeftRadius: '50%', borderBottomLeftRadius: '50%' }
            : { borderTopLeftRadius: '50%', borderTopRightRadius: '50%' },
          ...size === 'medium'
            ? { width: 50, height: 50 }
            : { width: 35, height: 35 }
        }}>
        +
      </ButtonBaseStyled>
      <Typography
        sx={{
          ...size === 'medium'
            ? { width: 50, height: 50 }
            : { width: 35, height: 35 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {value}
      </Typography>
      <ButtonBaseStyled
        onClick={handleDecrease}
        sx={{
          ...direction === 'row'
            ? { borderTopRightRadius: '50%', borderBottomRightRadius: '50%' }
            : { borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%' },
          ...size === 'medium'
            ? { width: 50, height: 50 }
            : { width: 35, height: 35 }
        }}>
        -
      </ButtonBaseStyled>
    </Box>
  )
}

export default memo(ProductCounter)