import React from 'react';
import { useMe } from '@/data/user';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import RenderSignInPage from '@/components/auth/render-login-page';
import Link from 'next/link';

const LoginPage = () => {
  const { me: user, isAuthorized, isLoading } = useMe();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <div>Loading...</div>; // Or your preferred loading state
  }

  if (isAuthorized && user && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-80 mx-auto mt-10 text-lg">
        <div className="mb-2">
          You have signed in as 
        </div>
        <span className="font-medium ml-5 text-lg">{user.email}</span>
        <Link href="/" className="w-full text-center bg-blue-500 text-white py-2 rounded mt-4 text-lg">
            Go to homepage
        </Link>
      </div>
    );
  }

  return <RenderSignInPage />;
};

export default LoginPage;