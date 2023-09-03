import { FC } from 'react'
import { Box } from '@mui/material'
import { SocialNetwork } from './SocialNetwork'

import { SocialNetwork as ISocialNetwork } from '@/interfaces'

interface Props {
  socialNetworks: ISocialNetwork[]
}

export const SocialNetworks: FC<Props> = ({ socialNetworks }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5
      }}
    >
      {socialNetworks.map(socialNetwork => (
        <SocialNetwork
          key={socialNetwork._id}
          socialNetwork={socialNetwork} />
      ))}
    </Box>
  )
}
