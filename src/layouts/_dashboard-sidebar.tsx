import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Listbox, Transition } from '@headlessui/react';
import routes from '@/config/routes';
import ActiveLink from '@/components/ui/links/active-link';
import { PurchaseIcon } from '@/components/icons/purchase-icon';
import { UserIconAlt } from '@/components/icons/user-icon-alt';
import { HeartFillIcon } from '@/components/icons/heart-fill';
import { LogoutIcon } from '@/components/icons/logout-icon';
import { useLogout } from '@/lib/hooks/sign-out';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useTranslation } from 'next-i18next';
import { CreditCardIcon } from '@/components/icons/credit-card-icon';
import { useMe } from '@/data/user';

const menuItems = [
  {
    id: 1,
    icon: <UserIconAlt className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />,
    label: 'text-auth-profile',
    path: routes.profile,
  },
  {
    id: 2,
    icon: <PurchaseIcon className="h-[15px] w-[15px] sm:h-4 sm:w-4" />,
    label: 'text-auth-purchase',
    path: routes.purchases,
  },
  {
    id: 3,
    icon: <CreditCardIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />,
    label: 'text-auth-cards',
    path: routes.cards,
  },
  {
    id: 4,
    icon: <HeartFillIcon className="h-[15px] w-[15px] sm:h-4 sm:w-4" />,
    label: 'text-auth-wishlist',
    path: routes.wishlists,
  },
  
];

function SidebarNav() {
  const { logout } = useLogout();
  const { t } = useTranslation('common');
  const { me } = useMe();
  
  return (
    <div className="flex h-full flex-col">
      <nav className="hidden grow flex-col text-13px text-dark-900 lg:flex">
        {menuItems?.slice(0, -1)?.map((item) => (
          <ActiveLink
            key={t(item?.label)}
            href={item?.path}
            className="flex items-center gap-3 px-6 py-3.5 hover:text-dark focus:text-dark dark:hover:text-light dark:focus:text-light "
            activeClassName="text-dark-100 dark:text-light-400 font-medium bg-light-300/90 dark:bg-dark-400"
          >
            <span className="flex w-5 items-start">{item?.icon}</span>{' '}
            <span className="text-dark-100 dark:text-light-400">
              {t(item?.label)}
            </span>
          </ActiveLink>
        ))}
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-2.5 px-6 py-3.5 text-left hover:text-dark focus:text-dark dark:hover:text-light dark:focus:text-light "
        >
          <LogoutIcon className="h-6 w-6" />
          <span className="text-dark-100 dark:text-light-400">
            {t('text-logout')}
          </span>
        </button>
      </nav>
    </div>
  );
}

function SidebarMobileNav() {
  const { pathname } = useRouter();
  const { logout } = useLogout();
  const currentPath = menuItems.findIndex((item) => item?.path === pathname);
  let [selected, setSelected] = useState(menuItems[currentPath]);
  useEffect(() => {
    setSelected(menuItems[currentPath]);
  }, [currentPath]);
  const { t } = useTranslation('common');
  return (
    <nav className="mb-8 flex flex-col xs:mb-10 sm:mb-12 lg:hidden">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="group flex w-full items-center justify-between rounded-md border border-light-500 px-4 py-[11px] text-13px font-medium text-dark ring-[0.5px] ring-light-500 dark:border-dark-600 dark:text-light dark:ring-dark-600 sm:px-5 sm:py-3 sm:text-sm md:py-3.5">
            <span className="flex items-center gap-2.5 truncate sm:gap-3">
              {selected?.icon} {t(selected?.label)}
            </span>
            <span className="pointer-events-none text-light-base group-hover:text-dark dark:text-dark-base dark:group-hover:text-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[17px] w-[17px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-light pb-2 pt-1 text-base shadow-dropdown dark:bg-dark-200">
              {menuItems.map((item, itemIdx) => (
                <Listbox.Option key={itemIdx} value={item}>
                  <ActiveLink
                    href={item.path}
                    className="flex items-center gap-2.5 px-4 py-2 text-13px hover:text-dark focus:text-dark dark:hover:text-light dark:focus:text-light sm:px-5 sm:py-3 sm:text-sm md:py-3.5 "
                    activeClassName="text-dark dark:text-light font-medium bg-light-400 dark:bg-dark-400"
                  >
                    <span className="flex w-5 items-start">{item?.icon}</span>{' '}
                    {t(item?.label)}
                  </ActiveLink>
                </Listbox.Option>
              ))}
              <button
                onClick={() => logout()}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-13px hover:text-dark focus:text-dark dark:hover:text-light dark:focus:text-light sm:px-5 sm:py-3 sm:text-sm md:py-3.5 "
              >
                <LogoutIcon className="h-5 w-5" />
                {t('text-logout')}
              </button>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </nav>
  );
}

export default function Sidebar() {
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  return (
    <aside className="border-light-300 dark:border-dark-400 lg:w-60 lg:flex-shrink-0 lg:bg-light ltr:lg:border-r rtl:lg:border-l lg:dark:bg-dark-250">
      {isMounted && ['xs', 'sm', 'md'].indexOf(breakpoint) !== -1 ? (
        <SidebarMobileNav />
      ) : (
        <SidebarNav />
      )}
    </aside>
  );
}
