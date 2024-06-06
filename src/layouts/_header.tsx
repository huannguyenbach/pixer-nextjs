import CartButton from '@/components/cart/cart-button';
import SearchButton from '@/components/search/search-button';
import Alert from '@/components/ui/alert';
import CountdownTimer from '@/components/ui/countdown-timer';
import Hamburger from '@/components/ui/hamburger';
import LoginMenu from '@/components/ui/header-login-logout-button';
import Logo from '@/components/ui/logo';
import { useSettings } from '@/data/settings';
import {
  RESPONSIVE_WIDTH,
  checkIsMaintenanceModeComing,
  checkIsScrollingStart,
} from '@/lib/constants';
import { useSwapBodyClassOnScrollDirection } from '@/lib/hooks/use-swap-body-class';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import { useWindowSize } from 'react-use';

interface HeaderProps {
  isCollapse?: boolean;
  showHamburger?: boolean;
  onClickHamburger?: () => void;
}

export default function Header({
  isCollapse,
  showHamburger = false,
  onClickHamburger,
}: HeaderProps) {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  const [underMaintenanceIsComing] = useAtom(checkIsMaintenanceModeComing);
  const { settings } = useSettings();
  useSwapBodyClassOnScrollDirection();
  const [isScrolling] = useAtom(checkIsScrollingStart);

  return (
    <>
      {width >= RESPONSIVE_WIDTH && underMaintenanceIsComing && !isScrolling ? (
        <Alert
          message={t('text-maintenance-mode-title')}
          variant="info"
          className="sticky top-0 left-0 z-50 rounded-none"
          childClassName="flex justify-center items-center w-full gap-4"
        >
          <CountdownTimer
            date={new Date(settings?.maintenance?.start as string)}
            className="text-blue-600 [&>p]:bg-blue-200 [&>p]:p-2 [&>p]:text-xs [&>p]:text-blue-600"
          />
        </Alert>
      ) : (
        ''
      )}
      <header className="app-header sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-light-300 bg-light py-1 px-4 ltr:left-0 rtl:right-0 dark:border-dark-300 dark:bg-dark-250 sm:h-[70px] sm:px-6">
        <div className="flex items-center gap-4">
          {showHamburger && (
            <Hamburger
              isToggle={isCollapse}
              onClick={onClickHamburger}
              className="hidden sm:flex"
            />
          )}
          <Logo />
        </div>
        <div className="flex items-center gap-4">
        <SearchButton className="hidden sm:flex bg-gray-200  hover:bg-gray-100 max-w-32 md:max-w-64 sm:text-sm border border-gray-300 rounded-lg py-2 pl-2 pr-20 justify-between  items-center transition-all" />
        </div>
        <div className="relative flex items-center gap-5 pr-0.5 xs:gap-6 sm:gap-7">
          {/* <SearchButton className="hidden sm:flex bg-gray-200  hover:bg-gray-100 max-w-32 md:max-w-64 sm:text-sm border border-gray-300 rounded-lg py-2 pl-2 pr-20 justify-between  items-center transition-all" /> */}
          
          {/* <CartButton className="hidden sm:flex" />   */}
          <LoginMenu />
        </div>
      </header>
    </>
  );
}
