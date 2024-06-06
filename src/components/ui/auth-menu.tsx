import { Menu } from '@headlessui/react';
import ActiveLink from '@/components/ui/links/active-link';
import { Transition } from '@/components/ui/transition';
import { useLogout } from '@/lib/hooks/sign-out';
import { AuthorizedMenuItems } from '@/lib/constants';
import type { User } from '@supabase/supabase-js'
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';
import Avatar from '@/components/ui/avatar';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import { WishlistIcon } from '@/components/icons/wishlist-icon';
import { useWishlist } from '@/data/wishlist';
import { ChevronDown } from '@/components/icons/chevron-down';

const wishlist_url = API_ENDPOINTS.WISHLIST;

export default function AuthorizedMenu({ user }: { user: User }) {
  const { logout } = useLogout();
  const { t } = useTranslation('common');
  const { totalCount } = useWishlist();

  return (
    <Menu>
      <div className="p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
        <a
        href={wishlist_url}
        className="relative inline-flex items-center justify-center relative px-3 py-1.5 rounded-md transition-all ease-in duration-75 bg-white group-hover:bg-opacity-0">
          <WishlistIcon />
          <span className="mx-2">Your Booklist</span>

          {totalCount && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-black bg-light-200 border rounded-full -top-2 -end-2">
              {totalCount}
            </span>
          )}
          
        </a>
      </div>
      <Menu.Button className="flex items-center text-sm pe-1 bg-light-100 font-medium text-gray-900 rounded-full hover:text-blue-600 md:me-0 focus:ring-2 focus:ring-gray-100">
        <Avatar
          size="sm"
          name="avatar"
          src='/icons/headshot-enhanced.webp'
          className="w-8 h-8 me-1 rounded-full"
        />
        <span className="ms-1">
          <ChevronDown />
        </span> 
      
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-[84%] z-30 mt-4 w-56 rounded-md bg-light py-1.5 text-dark shadow-dropdown right-0 origin-top-right">
          <Menu.Item>
            <div className="px-4 py-3 text-sm text-gray-900 border-b border-light-300">
              <div>Signed in with</div>
              {user?.email &&
              <div className="font-medium truncate">{user.email}</div>
              }
            </div>
          </Menu.Item>
          {AuthorizedMenuItems?.map((item) => (
            <Menu.Item key={item.label}>
              <ActiveLink
                href={item.path}
                className="transition-fill-colors flex w-full items-center text-sm px-5 py-2.5 hover:bg-light-400"
              >
                {t(item.label)}
              </ActiveLink>
            </Menu.Item>
          ))}
          <Menu.Item>
            <button
              type="button"
              className="transition-fill-colors w-full px-5 py-2.5 mt-2 hover:bg-light-400 text-left text-sm border-t border-light-300 flex items-center"
              onClick={() => {
                logout();
              }}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
              Log Out
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
