import type {
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import supabase from '@/utils/supabase/supabaseClient';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import { Product } from '@/types';

// This function gets called at build time
type ParsedQueryParams = {
  productSlug: string;
};
const products_table = API_ENDPOINTS.MAIN_SUPABASE_COLUMN;

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data, error } = await supabase
    .from(products_table)
    .select('slug');

  if (error) throw error;

  const paths = data?.map((product) => ({
    params: { productSlug: product.slug },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

type PageProps = {
  product: Product;
};

export const getStaticProps: GetStaticProps<
PageProps,
ParsedQueryParams
>
= async ({ params, locale}) => {
  const { productSlug } = params!; //* we know it's required because of getStaticPaths
  try {
    const { data: product, error } = await supabase
    .from(products_table)
    .select('*')
    .eq('slug', productSlug)
    .single();
    if (error) throw error;
    if (!product) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        product,
        product_id: product.id,
        ...(await serverSideTranslations(locale!, ['common'])),
      },
      revalidate: 60, // In seconds
    };
  } catch (error) {
    //* if we get here, the product doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }
};
