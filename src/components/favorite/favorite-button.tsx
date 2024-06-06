import { useModalAction } from '@/components/modal-views/context';
import { useCheckInWishlist, useAddToWishlist, useWishlist } from '@/data/wishlist';
import { useMe } from '@/data/user';
import classNames from 'classnames';
import LoadingButton from '@/components/ui/loading-button';
import { useState } from 'react';

export default function FavoriteButton({
  product_id,
  className,
}: {
  product_id: string;
  variationId?: string;
  className?: string;
}) {
  const { openModal } = useModalAction();
  const { isAuthorized } = useMe();
  const { inWishlist, isLoading: checking, refetch } = useCheckInWishlist({
    enabled: isAuthorized,
    product_id: product_id,
  });
  const { refetch: refetchUseWishlist } = useWishlist();
  const { addWishlist, isLoading: adding } = useAddToWishlist(product_id);
  const [loading, setLoading] = useState(false);
  async function wishlistButton() {
    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
      return;
    }
    setLoading(true);
    try {
      await addWishlist();
      await refetch();
      refetchUseWishlist();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const isLoading = loading || adding || checking;
  if (isLoading) {
    return (
      <LoadingButton className='w-full py-2.5 px-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700'/>
    );
  }
  return (
    <button
      type="button"
      className={classNames(
        'w-full h-full border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg',
        className
      )}
      onClick={wishlistButton}
      disabled={inWishlist}
    >
      {inWishlist ? (
        <div className="w-full h-full text-gray-900 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center justify-center">
          <svg className="w-[20px] h-[20px] mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#699f4c" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd"/>
          </svg>
          <span className="shrink-0">Added to Booklist</span>
        </div>
      ) : (
        <div className="w-full h-full hover:bg-blue-700 bg-blue-500 text-white font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center justify-center">
          <svg className="w-[20px] h-[20px] mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
          </svg>
          <span className="shrink-0">Add to Booklist</span>
        </div>
      )}
    </button>
  );
}
