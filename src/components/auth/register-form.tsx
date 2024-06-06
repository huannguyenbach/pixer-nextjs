import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { RegisterUserInput } from '@/types';
import toast from 'react-hot-toast';
import { useModalAction } from '@/components/modal-views/context';
import Button from '@/components/ui/button';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { createClient } from '@/utils/supabase/component';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/utils/supabase/use-auth';

const registerUserValidationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required(),
  password: Yup.string().min(6, 'Must be at least 6 characters').required(),
});

export default function RegisterUserForm() {
  const supabase = createClient();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { openModal} = useModalAction();
  const { authorize } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<RegisterUserInput>({
    resolver: yupResolver(registerUserValidationSchema),
  });
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
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
    
        if (error) {
          throw error;
        }
    
        toast.success('Register successful');
        authorize();
        router.reload();
      } catch (error) {
        toast.error('Sign up failed! Please try again.', {
          className: '-mt-10 xs:mt-0 font-bold',
        });
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="bg-light px-6 pt-10 pb-8 dark:bg-dark-300 sm:px-8 lg:p-12">
      <div className="relative z-10 flex items-center">
        <div className="w-[330px] sm:w-[384px] flex-1 flex flex-col">
          <div className="mb-10">
            <h1 className="mb-2 text-2xl lg:text-3xl text-center font-medium">
                Create your account
            </h1>
            <h2 className="text-sm text-foreground-light text-center">
                Sign up and enter a world of amazing books
            </h2>
          </div>
          <div>
            <button className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none 
            focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 shadow-sm">Sign up with Google</button>
            <button className="mb-8 w-full bg-white p-2 text-gray-900 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none 
            focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 shadow-sm">Sign up with Facebook</button>
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
            onSubmit={handleSubmit(handleSignUp)}
            className="mt-8"
          >
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
          <div className="text-gray-700 text-sm w-full mb-4 item-center flex justify-center">
            <span>Already a member? </span>
            <button
                onClick={() => openModal('LOGIN_VIEW')}
                className="underline ml-2 hover:no-underline"
              >
                Sign in
              </button>
          </div>
          <p className="text-center text-gray-500 text-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy, and to receive periodic emails with updates.
          </p>
        </div>
                
      </div>
    </div>
  );
}
