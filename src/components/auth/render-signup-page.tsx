import React, { useState } from 'react';
import * as Yup from 'yup';
import Button from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { RegisterUserInput } from '@/types';
import { createClient } from '@/utils/supabase/component';
import useAuth from '@/utils/supabase/use-auth';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

const schema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required(),
    password: Yup.string().min(6, 'Must be at least 6 characters').required(),
  });
  
  export default function RenderSignUpPage() {
    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<RegisterUserInput>({
      resolver: yupResolver(schema),
    });
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const { authorize } = useAuth();
    const router = useRouter();

    //handle input change
    const handleInputChange = async (field: "email" | "password") => {
      await trigger(field);
    };
    watch((_, { name }) => {
      if (name) {
        handleInputChange(name);
      }
    });
    //handle sign up form submit
    const handleSignUp: SubmitHandler<RegisterUserInput> = async (data) => {
      setIsLoading(true);
      try {
        const { error} = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (error) {
          throw error;
        }
        toast.success('Register successful. Please verify your email address', { duration: 3000 });
        authorize();
        router.push('/');
      } catch (error) {
        toast.error(('Sign up failed! Please try again.'), {
          className: '-mt-10 xs:mt-0 font-bold',
        });
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
                            Create your account
                        </h1>
                        <h2 className="text-sm text-foreground-light text-center">
                            Sign up and enter a world of amazing books
                        </h2>
                    </div>
                    <button className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none 
                    focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 shadow-sm">Sign up with Google</button>
                    <button className="mb-8 w-full bg-white p-2 text-gray-900 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none 
                    focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 shadow-sm">Sign up with Facebook</button>
                    <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-2 bg-white text-sm text-gray-500">or</span>
                    </div>
                    </div>
                    <form 
                      onSubmit={handleSubmit(handleSignUp)}
                      className="mt-8"
                    >
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
                              <label className="block text-sm font-medium text-gray-700">
                                Password    
                                <input
                                  {...register('password')}
                                  type="password"
                                  placeholder="********"
                                  className="mt-2 py-2 px-4 mb-1 w-full border border-light-500 rounded-lg"
                                />
                                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                              </label>
                          </div>
                          <Button
                          type="submit"
                          className="mb-4 w-full px-5 py-2.5 text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm"
                          isLoading={isLoading}
                          disabled={isLoading}
                          >
                            Sign up
                          </Button>
                      </div>
                    </form>
                    <p className="text-gray-700 text-center">Already a member? <a href="/login" className="underline">Sign in</a></p>
                </div>
                <p className="text-center text-gray-500 text-xs">
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