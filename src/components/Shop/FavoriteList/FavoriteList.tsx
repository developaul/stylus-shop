import { FC, useContext } from 'react'
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { FavoriteListItem } from './FavoriteListItem'

import { FavoriteProductsContext } from '@/context'

interface Props {
  onClose: () => void
}

export const FavoriteList: FC<Props> = ({ onClose }) => {

  const { favoriteProducts } = useContext(FavoriteProductsContext)

  return (
    <Box>
      <IconButton sx={{ ml: 2, mt: 2 }} onClick={onClose} >
        <CloseIcon />
      </IconButton>

      <Typography
        sx={{ textAlign: 'center', mt: 2 }}
        variant='h6'>
        Favoritos ({favoriteProducts.length})
      </Typography>

      <List>
        {
          favoriteProducts.length ?
            favoriteProducts.map((product) => <FavoriteListItem key={product._id} product={product} onClose={onClose} />) :
            (
              <ListItem>
                <ListItemText primary={'No hay productos favoritos aun...'} />
              </ListItem>
            )
        }
      </List>
    </Box>
  )
}
