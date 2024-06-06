import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout, Product } from '@/types';
import { motion } from 'framer-motion';
import DashboardLayout from '@/layouts/_dashboard';
import Image from '@/components/ui/image';
import CartEmpty from '@/components/cart/cart-empty';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import rangeMap from '@/lib/range-map';
import Button from '@/components/ui/button';
import placeholder from '@/assets/images/placeholders/product.svg';
import { useRemoveFromWishlist, useWishlist, getWishlistProductById } from '@/data/wishlist';
import Link from '@/components/ui/link';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CloseIcon } from '@/components/icons/close-icon';
import toast from 'react-hot-toast';
import { InfiniteData, QueryObserverResult } from 'react-query';
import {SpinnerIcon} from '@/components/icons/spinner-icon';

const WishlistContext = createContext<{
  refetch: () => Promise<QueryObserverResult<InfiniteData<{ data: any[]; count: number | null; } | undefined>, unknown>>;
} | null>(null);

function WishlistItem({ product }: { product: Product }) {
  const {id, product_id} = product ?? {};
  const { removeFromWishlist, isLoading: isRemoving } = useRemoveFromWishlist(id);
  const [productData, setProductData] = useState<Product | null>(null);
  
  useEffect(() => {
    getWishlistProductById(product_id).then((data) => {
      if (Array.isArray(data)) {
        setProductData(data[0]);
      } else {
        setProductData(data);
      }
    });
  }, [product_id]);
  
  const wishlistContext = useContext(WishlistContext);
  if (!wishlistContext) {
    throw new Error('Context is null');
  }
  const { refetch } = wishlistContext

  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishlist();
      refetch();
    } catch (error) {
      toast.error('Failed to remove item from your booklist');
    }
  };
    const productSingleUrl = `/products/${productData?.slug}`

  return (
    <div className={`relative ${isRemoving ? 'opacity-50 bg-light-200' : ''}`}>
      <div className="flex items-start gap-4 border-b border-light-400 py-7 sm:gap-5">
        <Link 
          href={`${productSingleUrl}`}
          className="relative aspect-[4/5] w-28 flex-shrink-0 border border-light-300 sm:w-32 md:w-36">
          <Image
            alt={productData?.name ?? 'PDF ebook'}
            fill
            quality={100}
            src={productData?.image ?? placeholder}
            className="bg-light-400 object-cover"
          />
        </Link>
        <div className="sm:flex-start flex flex-1 flex-col gap-3 sm:flex-row sm:justify-between md:gap-0">
          <div className="border-b border-light-400 pb-4 sm:border-b-0 sm:pb-0">
            <Link
              href={`${productSingleUrl}`}
              className="font-medium text-dark sm:mb-1.5 hover:text-blue-600 hover:underline"
            >
              <h3 className="text-base">{productData?.name}</h3>
            </Link>
            
            <div className="mt-2 sm:mt-3 inline-flex gap-2 w-full">
              <span className="text-sm">by:</span>
              <span className="text-gray-500 text-sm">
                {productData?.author}
              </span>   
            </div>
            <div className="mt-2 sm:mt-3 inline-flex gap-2">
              {productData?.publisher && (
                  <span className="text-gray-700 border-r border-gray-300 pr-2">
                    {productData?.publisher}
                  </span>
              )}
              {productData?.print_isbn && (
                  <span className="text-gray-700 border-r border-gray-300 pr-2">
                    {productData?.print_isbn} 
                  </span>
              )}
              {productData?.edition && (
                  <span className="text-gray-700 border-r border-gray-300 pr-2">
                    {productData?.edition}
                  </span>
              )}
              {productData?.year && (
                  <span className="text-gray-700 last:border-r-0 pr-2">
                    {productData?.year}
                  </span>
              )}
            </div>
            <div className="mt-2 sm:mt-3">
              <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400">
                PDF available
              </span>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="h-4 w-4 transition-colors hover:text-red-500"
              onClick={handleRemoveFromWishlist}
              disabled={isRemoving}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
      {isRemoving && (
        <div className="absolute inset-0 flex items-center justify-center">
          <SpinnerIcon className="w-6 h-6 text-black"/>
        </div>
      )}
    </div>
  );
}

function WishlistItemLoader(props: any) {
  return (
    <div className="flex animate-pulse items-start gap-4 border-b border-light-400 py-4 last:border-b-0 dark:border-dark-400 sm:items-stretch sm:gap-5">
      <div className="relative aspect-[5/3.4] w-28 flex-shrink-0 bg-light-400 dark:bg-dark-400 sm:w-32 md:w-36" />
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:gap-0">
        <div className="h-full flex-grow border-b border-light-400 pb-3 dark:border-dark-600 sm:border-b-0 sm:pb-0">
          <div className="mb-3 h-2.5 w-1/4 bg-light-400 dark:bg-dark-400" />
          <div className="mb-6 h-2.5 w-2/4 bg-light-400 dark:bg-dark-400" />
          <div className="h-2.5 w-1/5 bg-light-400 dark:bg-dark-400" />
        </div>
        <div className="h-2.5  bg-light-400 dark:bg-dark-400 sm:h-12  sm:w-28 sm:rounded " />
        <div className="ml-3 h-2.5 w-4 bg-light-400 dark:bg-dark-400 sm:h-12 sm:w-12 sm:rounded" />
      </div>
    </div>
  );
}

const LIMIT = 10;
const MyWishlistPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const { wishlist, totalCount, isLoading, isLoadingMore, loadMore, hasNextPage, refetch } =
    useWishlist();

  return (
    <WishlistContext.Provider value={{ refetch }}>
      <motion.div
        variants={fadeInBottom()}
        className="flex min-h-full flex-grow flex-col"
      >
        <h1 className="mb-3 text-15px font-medium text-dark text-lg">
          {t('text-wishlist-title')}
          <span className="ml-1 text-light-900">({totalCount})</span>
        </h1>

        {isLoading &&
          !wishlist.length &&
          rangeMap(LIMIT, (i) => (
            <WishlistItemLoader key={`order-loader-${i}`} />
          ))}

        {!isLoading && !wishlist.length ? (
          <CartEmpty
            className="my-auto"
            description={t('text-product-purchase-message')}
          />
        ) : (
          wishlist.map((product) => (
            <WishlistItem key={product.id} product={product} />
          ))
        )}

        {hasNextPage && (
          <div className="mt-10 grid place-content-center">
            <Button
              onClick={loadMore}
              disabled={isLoadingMore}
              isLoading={isLoadingMore}
            >
              {t('text-loadmore')}
            </Button>
          </div>
        )}
      </motion.div>
    </WishlistContext.Provider>
  );
};

MyWishlistPage.authorization = true;
MyWishlistPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default MyWishlistPage;
