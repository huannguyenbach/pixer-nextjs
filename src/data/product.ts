import type {
  Product,
  ProductQueryOptions,
} from '@/types';
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from 'react-query';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import supabase from '@/utils/supabase/supabaseClient';

const products_table = API_ENDPOINTS.MAIN_SUPABASE_COLUMN;
const product_per_page = 15;

export function useProducts(
  options?: Partial<ProductQueryOptions>,
  config?: UseInfiniteQueryOptions<Product[], Error>
) {
  const formattedOptions = {
    ...options,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<Product[], Error>(
    [products_table, formattedOptions],
    async ({ pageParam = 0 }) => {
      const response = await supabase
        .from(products_table)
        .select('*')
        .range(pageParam, pageParam + product_per_page - 1);
      if (response.error) throw response.error;
      return response.data;
    },
    {
      ...config,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < product_per_page) return undefined; // No more pages
        return pages.length * product_per_page; // Return the start index for the next page
      },
    }
  );
  
  const handleLoadMore = () => {
    fetchNextPage();
  };

  return {
    products: data?.pages.flatMap((page) => page) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? data?.pages[data.pages.length - 1]
      : null,
    isLoading,
    error,
    hasNextPage,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
  };
}
export function useProduct(slug: string) {
  const { data, isLoading, error } = useQuery<Product, Error>(
    [products_table, { slug }],
    async () => {
      const response = await supabase
        .from(products_table)
        .select('*')
        .eq('slug', slug)
        .single();
      if (response.error) throw response.error;
      return response.data;
    }
  );

  return {
    product: data,
    isLoading,
    error,
  };
}
//useProducts query for Author, Category, Tags page
export function useTaxonomyProducts (
  taxonomy: string,
  value: string,
  config?: UseInfiniteQueryOptions<Product[], Error>
) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<Product[], Error>(
    [products_table, { taxonomy, value }],
    async ({ pageParam = 0 }) => {
      const response = await supabase
        .from(products_table)
        .select('*')
        .textSearch(taxonomy, `"${value}"`, {
          type: 'websearch',
          config: 'english', 
        })
        .range(pageParam, pageParam + product_per_page - 1);

      if (response.error) throw response.error;

      return response.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < product_per_page) return undefined;
        return pages.length * product_per_page;
      },
      ...config,
    }
  );
  const handleLoadMore = () => {
    fetchNextPage();
  };

  return {
    products: data?.pages.flatMap((page) => page) ?? [],
    paginatorInfo: Array.isArray(data?.pages)
      ? data?.pages[data.pages.length - 1]
      : null,
    isLoading,
    error,
    hasNextPage,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
  };
}