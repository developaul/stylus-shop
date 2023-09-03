import { FC } from 'react'
import Image from 'next/image'
import { IconButton } from '@mui/material'

import { SocialNetwork as ISocialNetwork } from '@/interfaces'

interface Props {
  socialNetwork: ISocialNetwork
}

export const SocialNetwork: FC<Props> = ({ socialNetwork }) => {
  return (
    <IconButton
      sx={{
        border: '1px solid #000',
      }}
    >
      <Image
        width={30}
        height={30}
        src={socialNetwork.icon}
        alt={socialNetwork.title}
      />
    </IconButton>
  )
}
