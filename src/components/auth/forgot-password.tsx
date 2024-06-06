
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '@/components/ui/button';
import { useModalAction } from '@/components/modal-views/context';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import supabase from '@/utils/supabase/supabaseClient';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const emailFormValidation = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required(),
});
export default function RestPasswordForm() {
  const { openModal, closeModal} = useModalAction();
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(emailFormValidation),
  });

  const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        throw error;
      }
      toast.success('Password reset email has been sent!');
      closeModal();
    } catch (error) {
      toast.error('Error comming from server, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-light px-6 pt-10 pb-8 dark:bg-dark-300 sm:px-8 lg:p-12">
      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[380px]">
          <div className="flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
            <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              {t('text-reset-password')}
            </h2>
            <div className="mt-1.5 text-13px leading-6 tracking-[0.2px] dark:text-light-900 lg:mt-2.5 xl:mt-3">
              {t('text-reset-password-title')}
            </div>
          </div>
          <form 
            onSubmit={handleSubmit(onSubmit)}
            className=""
          >
            
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
              
              <Button
                type="submit"
                className="mb-4 w-full px-5 py-2.5 text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Send
              </Button>
            </div>
          </form>
          <div className="relative mt-10 flex items-center justify-center border-t border-light-500 text-13px dark:border-dark-600">
            <span className="absolute inline-flex bg-light px-2 pb-0.5 dark:bg-dark-300">
              {t('text-or')}
            </span>
          </div>
          <div className="pt-7 text-center text-13px">
            {t('text-back-to')}{' '}
            <button
              type="button"
              className="font-semibold text-brand hover:text-dark-400 hover:dark:text-light-500"
              onClick={() => openModal('LOGIN_VIEW')}
            >
              {t('text-login')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
