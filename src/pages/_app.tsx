import type { AppProps } from 'next/app'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { ProductFilterProvider } from '@/context';
import { lightTheme } from '@/themes'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { FavoriteProductsProvider } from '@/context/FavoriteProducts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FavoriteProductsProvider>
      <ProductFilterProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ProductFilterProvider>
    </FavoriteProductsProvider>
  )
}
