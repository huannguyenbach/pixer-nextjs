import React, { useState } from 'react';
import * as Yup from 'yup';
import Button from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { LoginUserInput } from '@/types';
import { createClient } from '@/utils/supabase/component';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStateChange } from '@/utils/supabase/useAuthStateChange';
import useAuth from '@/utils/supabase/use-auth';
import { useRouter } from 'next/router';

const schema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required(),
    password: Yup.string().required(),
  });
  
  export default function RenderSignInPage() {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const { authorize } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<LoginUserInput>({
      resolver: yupResolver(schema),
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
        toast.success('Login successful', { duration: 3000 });
        authorize();
        router.push('/');
      } catch (error) {
        setLoginError('Incorrect email or password');
        setIsLoading(false);
      }
    };

  return (
    <div className="min-h-full flex flex-col">
        <div className="flex flex-1">
            <main className="w-2/5 p-12 flex flex-col justify-between items-center flex-1 flex-shrink-0 px-5 pt-8 pb-8 border-r shadow-lg bg-studio border-default">
                <div>
                    <img src="/icons/icon-192x192.png" className="h-12 mb-8" />
                </div>
                <div className="w-[330px] sm:w-[384px] flex-1 flex flex-col">
                    <div className="mb-10">
                        <h1 className="mt-8 mb-2 text-2xl lg:text-3xl text-center font-medium">
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
                          <div className="mb-4">
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
                          <div className="mb-8">
                              <div className="flex justify-between items-center">
                                  <label className="block text-sm font-medium text-gray-700">
                                  Password
                                  </label>
                                  <a href="/forgot-password" className="text-sm text-blue-500">Forgot password?</a>
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
                          {/* <button type="submit" className="mb-4 w-full px-5 py-2.5 text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm">Sign In</button> */}
                      </div>
                    </form>
                    <p className="text-gray-700 text-center">Don't have an account? <a href="/register" className="underline">Sign Up Now</a></p>
                </div>
                
                <p className="w-[330px] sm:w-[384px] text-center text-gray-500 text-xs">
                By continuing, you agree to our Terms of Service and Privacy Policy, and to receive periodic emails with updates.
                </p>
            </main>
            <aside className="flex-col items-center bg-light-100 justify-center flex-1 flex-shrink hidden basis-1/4 xl:flex">
                <p className="text-2xl text-gray-600">"A meaningful quote goes here."</p>
            </aside>
        </div>
    </div>
  );
}