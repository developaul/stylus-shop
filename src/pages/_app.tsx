import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

import { CssBaseline, ThemeProvider } from '@mui/material'

import {
  ProductFilterProvider, FavoriteProductsProvider,
  UserProvider, CartProductsProvider
} from '@/context';
import { lightTheme } from '@/themes'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}>
        <UserProvider>
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
        </UserProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
