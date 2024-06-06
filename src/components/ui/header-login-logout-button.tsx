import { useModalAction } from '@/components/modal-views/context';
import AuthorizedMenu from '@/components/ui/auth-menu';
import { useMe } from '@/data/user';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';

let currentUrl = '';
  if (typeof window !== 'undefined') {
    currentUrl = window.location.href;
  }// Get the current URL
  

export default function LoginMenu() {
  const { openModal } = useModalAction();
  const { me, isAuthorized, isLoading } = useMe();
  const isMounted = useIsMounted();
  if (!isMounted) {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-light-300 dark:bg-dark-500" />
    );
  }
  if (isAuthorized && me && !isLoading) {
    return <AuthorizedMenu user={me} />;
  }
  return (
    <div className="flex space-x-3">
      <button
        className="hidden sm:flex text-sm text-black bg-gray-200 hover:bg-gray-100 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-5 py-2 shadow-sm" 
        onClick={() => openModal('LOGIN_VIEW')}
        >
        Log in
      </button>
      <button
        className="hidden sm:flex text-sm text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg px-5 py-2 shadow-sm" 
        onClick={() => openModal('REGISTER')}
        >
        Sign Up
      </button> 
    </div>
  );
}
