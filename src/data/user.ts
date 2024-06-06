import type { User, Session } from '@supabase/supabase-js'
import useAuth from '@/utils/supabase/use-auth';
import { createClient } from '@/utils/supabase/component';
import { useEffect, useState } from 'react';

export function useMe() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { isAuthorized } = useAuth();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();

      if (data?.session) {
        setUser(data.session.user);
        setSession(data.session);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  return {
    me:user,
    session,
    isLoading,
    isAuthorized,
  };
}
