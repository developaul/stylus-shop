import { FC, useContext } from 'react'
import {
  Box, Checkbox, FormControl, InputLabel, ListItemText,
  MenuItem, OutlinedInput, Select, SelectChangeEvent
} from '@mui/material'

import { ProductFilterContext } from '@/context';
import { Order, Size, SizeEnum } from '@/constants';

interface Props {
}

export const ProductFilter: FC<Props> = ({ }) => {

  const {
    sizeFilter, order,
    updateSizeFilter, updateOrder
  } = useContext(ProductFilterContext)

  const onChangeSizeFilter = ({ target }: SelectChangeEvent<Size[]>) => {
    const value = target.value as Size[]

    const newSizeFilter = value.length ? value.filter(current => current !== Size.All) : [Size.All]

    updateSizeFilter(newSizeFilter)
  }

  const onChangeOrder = ({ target }: SelectChangeEvent<Order>) => {
    updateOrder(target.value as Order)
  }

  return (
    <Box>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="order-simple-select-label">Orden</InputLabel>
        <Select
          labelId="order-simple-select-label"
          id="order-simple-select"
          value={order}
          label="Age"
          onChange={onChangeOrder}
        >
          <MenuItem value={Order.Desc}>Más Recientes</MenuItem>
          <MenuItem value={Order.Asc}>Más Antiguos</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="size">Talla</InputLabel>
        <Select
          labelId="size-multiple-checkbox-label"
          id="size-multiple-checkbox"
          multiple
          value={sizeFilter}
          onChange={onChangeSizeFilter}
          input={<OutlinedInput label="Size" />}
          renderValue={(selected: Size[]) => selected.join(', ')}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
        >
          {SizeEnum.map((size) => {
            const isSelected = sizeFilter.includes(size)

            return (
              <MenuItem key={size} value={size}>
                <Checkbox checked={isSelected} />
                <ListItemText primary={size} />
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
