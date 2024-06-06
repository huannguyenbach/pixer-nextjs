import { useEffect } from 'react';
import supabase from '@/utils/supabase/supabaseClient';
import { useRouter } from 'next/router'; // Import useRouter hook
import useAuth from '@/utils/supabase/use-auth';
import toast from 'react-hot-toast';

export const useAuthStateChange = () => {
    const router = useRouter(); // Initialize the router
    const { authorize } = useAuth(); // Get authorize from useAuth hook
    
    useEffect(() => {
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {

        if (event === 'SIGNED_IN') {
        toast.success('Login successful', { duration: 3000 });
          router.push('/').then(() => {
            authorize();
          });
        }
      });
  
      // Clean up the listener when the component is unmounted
      return () => {
        authListener.subscription.unsubscribe();
      };
    }, []);
  };