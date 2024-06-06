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
const author_column = 'author';
type ProductsProps = {
    authorSlug: Product['slug'];
  };

const Products: React.FC<ProductsProps> = ({ authorSlug }) => {
    const { products, loadMore, hasNextPage, isLoadingMore, isLoading} =
    useTaxonomyProducts(author_column, authorSlug);

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

const AuthorsPage: NextPageWithLayout = () => {
    const router = useRouter();
    const authorSlug = (router.query.authorSlug as Product['slug']) || '';
    const authorName = decodeURIComponent(authorSlug);
    return (
    <>
      {/* <Seo
        title="Shops"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.authors}
      /> */}
      <div className="top-16 z-20 flex min-h-[64px] w-full overflow-hidden border-b border-light-400 bg-light-100 px-4 py-4 sm:top-[70px] sm:min-h-[70px] sm:px-5 sm:py-5 md:px-6 lg:px-7 3xl:px-8">
        <div className="inline-flex gap-2 text-base">
          <span className="text-medium">Author:</span>
          <h1 className="text-black">{authorName}</h1>
        </div>
      </div>
      <Products authorSlug={authorSlug}/>
    </>
  );
};

AuthorsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: products, error } = await supabase
      .from(products_table)
      .select(author_column)
  
    if (error) throw error;

  const authorsSet = new Set(products?.map((product) => product.author));
  const authors = Array.from(authorsSet);
  
    const paths = authors?.map((author) => ({
      params: { authorSlug: author },
    }));
  
    return {
      paths,
      fallback: 'blocking',
    };
  };
  
  export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const authorSlug = params?.authorSlug as Product['slug'];
  
    return {
      props: {
        authorSlug,
        ...(await serverSideTranslations(locale!, ['common'])),
      },
      revalidate: 60, // In seconds
    };
  };

export default AuthorsPage;
