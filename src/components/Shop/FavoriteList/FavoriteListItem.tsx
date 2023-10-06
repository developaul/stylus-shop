import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'

import { FavoriteProduct } from '@/interfaces'

interface Props {
  product: FavoriteProduct
  onClose: () => void
}

export const FavoriteListItem: FC<Props> = ({ product, onClose }) => {
  const router = useRouter()

  const onRedirect = () => {
    onClose()
    router.push(`/producto/${product.slug}`)
  }

  return (
    <ListItem>
      <ListItemButton sx={{ gap: 2 }} onClick={onRedirect} >
        <ListItemAvatar>
          <Image
            alt={product.title}
            src={product.image}
            width={80}
            height={100}
          />
        </ListItemAvatar>
        <ListItemText primary={product.title} />
      </ListItemButton>
    </ListItem>
  )
}
