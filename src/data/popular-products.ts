import { useInfiniteQuery } from 'react-query';
import supabase from '@/utils/supabase/supabaseClient';
import { Product } from '@/types';
import { API_ENDPOINTS } from '@/data/client/endpoints';

const product_per_page = 4;
const products_table = API_ENDPOINTS.MAIN_SUPABASE_COLUMN;
const view_count_table = API_ENDPOINTS.VIEWS_COUNT_TABLE;
const MAX_POPULAR_PRODUCTS = 12;

const fetchPopularProducts = async ({ pageParam = 0 }): Promise<Product[]> => {
    
    const start = pageParam * product_per_page;
    const end = Math.min(start + product_per_page, MAX_POPULAR_PRODUCTS) - 1;
  
    if (start >= MAX_POPULAR_PRODUCTS) {
      return [];
    }

    const response = await supabase
    .from(view_count_table)
    .select(`${products_table} (*)`)
    .order('views', { ascending: false })
    .range(start, end);

  if (response.error) throw response.error;
  
  return response.data.flatMap(item => item[products_table]);
};

export function usePopularProducts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<Product[], Error>(
    'popularProducts',
    fetchPopularProducts,
    {

      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return undefined;
        return pages.length;
      },
    }
  );
  const handleLoadMore = () => {
    fetchNextPage();
  };

  return {
    products: data?.pages.flat() || [],
    paginatorInfo: Array.isArray(data?.pages)
      ? data?.pages[data.pages.length - 1]
      : null,
    error,
    loadMore: handleLoadMore,
    hasNextPage,
    isFetching,
    isLoading: status === 'loading',
    isLoadingMore: isFetchingNextPage,
  };
}