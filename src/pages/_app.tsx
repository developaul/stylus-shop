import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';

import { CssBaseline, ThemeProvider } from '@mui/material'

import { ProductFilterProvider, FavoriteProductsProvider } from '@/context';
import { lightTheme } from '@/themes'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { CartProductsProvider } from '@/context/CartProducts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}>
      <FavoriteProductsProvider>
        <CartProductsProvider>
          <ProductFilterProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </ProductFilterProvider>
        </CartProductsProvider>
      </FavoriteProductsProvider>
    </SWRConfig>
  )
}
