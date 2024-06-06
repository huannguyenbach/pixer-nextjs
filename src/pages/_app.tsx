import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { appWithTranslation } from 'next-i18next';
import { validateEnvironmentVariables } from '@/config/validate-environment-variables';
import { CartProvider } from '@/components/cart/lib/cart.context';
import { ModalProvider } from '@/components/modal-views/context';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SearchView from '@/components/search/search-view';
import DefaultSeo from '@/layouts/_default-seo';
import { Router, useRouter } from 'next/router';
import { getDirection } from '@/lib/constants';
// base css file
import '@/assets/css/scrollbar.css';
import '@/assets/css/swiper-carousel.css';
import '@/assets/css/pagination.css';
import '@/assets/css/globals.css';
import "@/assets/css/typesense-searchview.css";
import "instantsearch.css/themes/satellite.css";
//Loading bar using nprogress
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
//Supabase Auth Provider


validateEnvironmentVariables();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const { locale } = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);
  const dir = getDirection(locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  return (
    <QueryClientProvider client={queryClient}>
      
      <Hydrate state={pageProps.dehydratedState}>
        <CartProvider>
          <ModalProvider>
            <AnimatePresence initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
              <>
                <DefaultSeo />
                      {getLayout(<Component {...pageProps} />)}   
                <SearchView />
                <ModalsContainer />
                <DrawersContainer />
                <Toaster containerClassName="!top-16 sm:!top-3.5 !bottom-16 sm:!bottom-3.5" />
              </>
            </AnimatePresence>
          </ModalProvider>
        </CartProvider>
      </Hydrate>   
    </QueryClientProvider>
  );
}
export default appWithTranslation(CustomApp);
