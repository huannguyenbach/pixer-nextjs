import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { NextPageWithLayout, Product } from '@/types';
import Layout from '@/layouts/_layout';
import Grid from '@/components/product/grid';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { useRouter } from 'next/router';
import { useTaxonomyProducts } from '@/data/product';
import supabase from '@/utils/supabase/supabaseClient';
import { API_ENDPOINTS } from '@/data/client/endpoints';

const products_table = API_ENDPOINTS.MAIN_SUPABASE_COLUMN;
const publisher_column = 'publisher';
type ProductsProps = {
    publisherSlug: Product['slug'];
  };

const Products: React.FC<ProductsProps> = ({ publisherSlug }) => {
    const { products, loadMore, hasNextPage, isLoadingMore, isLoading } =
    useTaxonomyProducts(publisher_column, publisherSlug);

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

const PublisherPage: NextPageWithLayout = () => {
    const router = useRouter();
    const publisherSlug = (router.query.publisherSlug as Product['slug']) || '';
    return (
    <>
      {/* <Seo
        title="Shops"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.authors}
      /> */}
      <Products publisherSlug={publisherSlug}/>
    </>
  );
};

PublisherPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: products, error } = await supabase
      .from(products_table)
      .select(publisher_column)
  
    if (error) throw error;

    const publishersSet = new Set(products?.map((product) => product.publisher));
  const publishers = Array.from(publishersSet);
  
    const paths = publishers?.map((publisher) => ({
      params: { publisherSlug: publisher },
    }));
  
    return {
      paths,
      fallback: 'blocking',
    };
  };
  
  export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const publisherSlug = params?.publisherSlug as Product['slug'];
  
    return {
      props: {
        publisherSlug,
        ...(await serverSideTranslations(locale!, ['common'])),
      },
      revalidate: 60, // In seconds
    };
  };

export default PublisherPage;
