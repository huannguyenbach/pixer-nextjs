import { useModalAction } from '@/components/modal-views/context';
import Button from '@/components/ui/button';
import type { LoginUserInput } from '@/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/component';
import useAuth from '@/utils/supabase/use-auth';
import { yupResolver } from '@hookform/resolvers/yup';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required(),
  password: Yup.string().required(),
});

export default function LoginUserForm() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { openModal} = useModalAction();
  const { authorize } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<LoginUserInput>({
    resolver: yupResolver(loginValidationSchema),
  });
  
  //handle input change
  const handleInputChange = async (field: "email" | "password") => {
    setLoginError(null);
    await trigger(field);
  };
  watch((_, { name }) => {
    if (name) {
      handleInputChange(name);
    }
  });
  //handle login form submit
  const handleSignIn: SubmitHandler<LoginUserInput> = async (data) => {
    setIsLoading(true);
    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
  
      if (error) {
        throw error;
      }
  
      setLoginError(null);
      toast.success('Login successful', { duration: 3000 });
      authorize();
      router.reload();
    } catch (error) {
      setLoginError('Incorrect email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-light px-6 pb-8 pt-6sm:px-8 lg:p-12">
      <div className="relative z-10 flex items-center">
        <div className="w-[330px] sm:w-[384px] flex-1 flex flex-col">
          <div className="mb-10">
              <h1 className="mb-2 text-2xl lg:text-3xl text-center font-medium">
                  Welcome back!
              </h1>
              <h2 className="text-sm text-foreground-light text-center">
                  Sign in to your account
              </h2>
          </div>
          <div>
            <button className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none 
            focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-4">Sign in with Google</button>
            <button className="mb-8 w-full bg-white p-2 text-gray-900 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none 
            focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">Sign in with Facebook</button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">or</span>
            </div>
          </div>

          <form 
            onSubmit={handleSubmit(handleSignIn)}
            className="mt-8"
          >
            {/* show error message */}
            {loginError && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {loginError}
              </div>
            )}
            {/* End show error message */}
            <div className="flex flex-col gap-2">
              <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                    <input
                    {...register('email')}
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 py-2 px-4 mb-1 w-full border border-light-500 rounded-lg"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </label>
              </div>
              <div className="mb-4">
                  <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">
                      Password
                      </label>
                      <button
                        onClick={() => openModal('FORGOT_PASSWORD_VIEW')}
                        className="text-sm text-blue-500"
                      >
                        Forgot password?
                      </button>
                  </div>
                  <input
                      type="password"
                      placeholder="********"
                      {...register('password')}
                      className="mt-2 py-2 px-4 mb-1 w-full border border-light-500 rounded-lg"
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>
              <Button
                type="submit"
                className="mb-4 w-full px-5 py-2.5 text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Sign In
              </Button>
            </div>
          </form>
          <div className="text-gray-700 text-sm w-full mb-4 item-center flex justify-center">
            <span>Don't have an account? </span>
            <button
                onClick={() => openModal('REGISTER')}
                className="underline ml-2 hover:no-underline"
              >
                Sign Up Now
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
