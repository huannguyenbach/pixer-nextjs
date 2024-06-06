import { atom } from 'jotai';
import routes from '@/config/routes';

export const CART_KEY = 'pixer-cart';
export const CHECKOUT = 'pixer-checkout';
export const RTL_LANGUAGES: ReadonlyArray<string> = ['ar', 'he'];
export const PERMISSIONS = 'permissions';
export const checkIsMaintenanceModeComing = atom(false);
export const checkIsMaintenanceModeStart = atom(false);
export const RESPONSIVE_WIDTH = 1024 as number;
export const isMultiLangEnable =
  process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
  !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;
export const checkIsScrollingStart = atom(false);

export function getDirection(language: string | undefined) {
  if (!language) return 'ltr';
  return RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
}

export const AuthorizedMenuItems = [
  {
    label: 'Edit profile',
    path: routes.profile,
  },
  {
    label: 'text-auth-purchase',
    path: routes.purchases,
  },
  {
    label: 'text-auth-wishlist',
    path: routes.wishlists,
  },
  // {
  //   label: 'text-followed-authors',
  //   path: routes.followedShop,
  // },
  // {
  //   label: 'text-auth-password',
  //   path: routes.password,
  // },
];
