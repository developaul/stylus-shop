import { FC } from 'react'
import { Chip } from '@mui/material'
import {
  NotInterestedOutlined as NotInterestedOutlinedIcon,
  CreditScoreOutlined as CreditScoreOutlinedIcon,
  CreditCardOffOutlined as CreditCardOffOutlinedIcon
} from '@mui/icons-material'

import { OrderStatus as IOrderStatus } from '@/constants'

interface Props {
  status: IOrderStatus
}

const statusMap = {
  [IOrderStatus.Cancelled]: (
    <Chip
      sx={{ my: 2 }}
      label='Orden cancelada'
      variant='outlined'
      color='error'
      icon={<NotInterestedOutlinedIcon />}
    />
  ),
  [IOrderStatus.Paid]: (
    <Chip
      sx={{ my: 2 }}
      label='Orden ya fue pagada'
      variant='outlined'
      color='success'
      icon={<CreditScoreOutlinedIcon />}
    />
  ),
  [IOrderStatus.Pending]: (
    <Chip
      sx={{ my: 2 }}
      label='Orden pendiente'
      variant='outlined'
      color='warning'
      icon={<CreditCardOffOutlinedIcon />}
    />
  )
}

export const OrderStatus: FC<Props> = ({ status }) => {
  return statusMap[status]
}
