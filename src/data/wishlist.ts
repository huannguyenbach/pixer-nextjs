import supabase from '@/utils/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { useMe } from '@/data/user';
import { useInfiniteQuery, useMutation } from 'react-query';
import { PostgrestError } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '@/data/client/endpoints';

const wishlist_table = API_ENDPOINTS.WISHLIST_TABLE;
const products_table = API_ENDPOINTS.MAIN_SUPABASE_COLUMN;

export function useCheckInWishlist({ enabled, product_id }) {
  const [inWishlist, setInWishlist] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  const { me:user } = useMe();
  const user_id = user?.id;

  const refetch = async () => {
    if (!user_id) {
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from(wishlist_table)
      .select('*')
      .eq('user_id', user_id)
      .eq('product_id', product_id);

    if (error) {
      setError(error);
    } else {
      setInWishlist(data && data.length > 0);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [enabled, product_id, user_id]);

  return { inWishlist, isLoading, error, refetch, setInWishlist };
}

export function useAddToWishlist(product_id: string) {
  const { me:user } = useMe();
  const user_id = user?.id;
  const { inWishlist, setInWishlist } = useCheckInWishlist({ enabled: true, product_id });

  const mutation = useMutation(async () => {
    if (inWishlist) {
      toast.error('This product is already in your wishlist.');
      return;
    }

    const { error } = await supabase
      .from(wishlist_table)
      .insert([{ user_id: user_id, product_id: product_id }]);

    if (error) {
      throw error;
    }

  }, {
    onSuccess: () => {
      setInWishlist(true);
      toast.success('Successfully added to your list!');
    },
    onError: () => {
      toast.error(`Failed to add to wishlist`);
    }
  });

  return { addWishlist: mutation.mutateAsync, isLoading: mutation.isLoading };
  
}

type Options = {
  limit?: number;
};

export function useWishlist(options: Options = {}) {
  const { me:user } = useMe();
  const user_id = user?.id;

  const fetchWishlist = async ({ pageParam = 0 }) => {
    if (!user_id) {
      return;
    }

    const { data, error, count } = await supabase
      .from(wishlist_table)
      .select('*', { count: 'exact' })
      .eq('user_id', user_id)
      .range(pageParam, pageParam + (options.limit || 10) - 1);

    if (error) {
      throw error;
    }

    return { data, count };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(['wishlist', user_id], fetchWishlist, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.data.length < (options.limit || 10)) return undefined; // No more pages
      return pages.length * (options.limit || 10); // Return the start index for the next page
    },
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  return {
    wishlist: data?.pages.flatMap((page) => page ? page.data : []) ?? [],
    totalCount: data?.pages[0]?.count || 0,
    isLoading: isLoading || isFetching,
    loadMore: handleLoadMore,
    hasNextPage: hasNextPage,
    isLoadingMore: isFetchingNextPage,
    refetch,
  };
}

export async function getWishlistProductById(product_id: string) {
  
  const { data, error } = await supabase
    .from(products_table)
    .select('*')
    .eq('id', product_id);

  if (error) {
    console.error('Error fetching product details:', error);
    return null;
  }

  return data;
}
export function useRemoveFromWishlist(row_id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { me:user } = useMe();
  const user_id = user?.id;
  
  const removeFromWishlist = async () => {
    if (!user_id) {
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase
      .from(wishlist_table)
      .delete()
      .eq('id', row_id)
      .eq('user_id', user_id);

    setIsLoading(false);

    if (error) {
      setError(error.message);
    } else {
      toast.success('Item removed from wishlist');
    }
  };

  return { removeFromWishlist, isLoading, error };
}

