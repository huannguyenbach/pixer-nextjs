import Grid from '@/components/product/grid';
import type { NextPageWithLayout } from '@/types';
import type { GetStaticProps } from 'next';
import Layout from '@/layouts/_layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { usePopularProducts } from '@/data/popular-products';

// Default export of a React Component
function PopularProducts() {
  const { products, isLoading, loadMore, hasNextPage, isLoadingMore } = usePopularProducts();
  
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
const PopularProductsPage: NextPageWithLayout = () => {
  return (
    <>
      <PopularProducts />
    </>
  );
};
PopularProductsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default PopularProductsPage;