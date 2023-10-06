import { FC, memo } from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { Size } from '@/constants'

interface Props {
  onChange: (name: string, value: any) => void;
  value?: Size;
  sizes: Size[]
}

const SelectSize: FC<Props> = ({ onChange, value, sizes }) => {

  const handleChange = ({ target }: SelectChangeEvent<Size>) => {
    onChange(target.name, target.value)
  }

  return (
    <FormControl sx={{ my: 3 }} fullWidth>
      <InputLabel id="size-simple-select-label">Talla</InputLabel>
      <Select
        labelId="size-simple-select-label"
        id="size-simple-select"
        value={value ?? ''}
        name='size'
        label="Talla"
        onChange={handleChange}
      >
        {
          sizes.map((size) => (
            <MenuItem
              key={size}
              value={size}>
              {size}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default memo(SelectSize)
