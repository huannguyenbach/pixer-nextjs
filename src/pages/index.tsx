import type {
  NextPageWithLayout,
} from '@/types';
import type { GetStaticProps } from 'next';
import Layout from '@/layouts/_layout';
import { useProducts } from '@/data/product';
import Grid from '@/components/product/grid';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { dehydrate, QueryClient } from 'react-query';
import CategoryFilter from '@/components/product/category-filter';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  if (!locale) {
    throw new Error('Locale is undefined');
  }
  const translations = await serverSideTranslations(locale, ['common']);
  return {
    props: {
      ...translations,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60, // In seconds
  };
};

function Products() {
  const { products, loadMore, hasNextPage, isLoadingMore, isLoading } =
    useProducts();
  return (
    <Grid
      products={products}
      limit={30}
      onLoadMore={loadMore}
      hasNextPage={hasNextPage}
      isLoadingMore={isLoadingMore}
      isLoading={isLoading}
    />
  );
}

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="UI Design Resources, UI Kits, Wireframes, Icons and More"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.home}
      />
      <CategoryFilter />
      <Products />
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
