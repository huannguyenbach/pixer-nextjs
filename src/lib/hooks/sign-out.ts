import useAuth from '@/utils/supabase/use-auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export function useLogout() {
    const { unauthorize } = useAuth();
    const router = useRouter();
    const logout = async () => {
      try {
        await unauthorize();
        toast.success('Logged Out');
        router.reload();
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    return { logout };
  }