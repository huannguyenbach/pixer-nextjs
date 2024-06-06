import { createClient } from '@/utils/supabase/component';

const supabase = createClient();

export const getAuthToken = async () => {
  if (typeof window === undefined) {
    return null;
  }
  const { data: {session}, error } = await supabase.auth.getSession();
    
  if (!session) {
    console.error('No active session');
    return null;
  }
    const {access_token, refresh_token}: any = session;
    return {access_token, refresh_token};
};
export const checkAuthorized = async () => {
  const tokens = await getAuthToken();
  if (!tokens || !tokens.access_token || !tokens.refresh_token) return false;
  return true;
};

export const setSession = async (access_token: string, refresh_token: string) => {
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token
  });

  if (error) {
    console.error('Error setting session:', error.message);
    return null;
  }
  
  return data?.session || null;
};

export async function removeSessionCookies() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  }
}
// export function setAuthCredentials(token: string, permissions: any) {
//   Cookies.set(AUTH_CRED, JSON.stringify({ token, permissions }));
// }

