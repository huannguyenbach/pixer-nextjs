import { atom, useAtom } from 'jotai';
import {
  checkAuthorized,
  getAuthToken,
  removeSessionCookies,
  setSession,
} from '@/utils/supabase/token.utils';
import { useEffect } from 'react';

const authorizationAtom = atom(false);

export default function useAuth() {
  const [isAuthorized, setAuthorized] = useAtom(authorizationAtom);
  useEffect(() => {
    checkAuthorized().then((authorized) => setAuthorized(authorized));
  }, []);
  return {
    setSession: setSession,
    getToken: getAuthToken,
    isAuthorized,
    authorize() {
      setAuthorized(true);
    },
    async unauthorize() {
      setAuthorized(false);
      await removeSessionCookies();
    },
  };
}
