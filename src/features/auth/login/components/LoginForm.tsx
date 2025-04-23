'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '@/actions/auth/login';
import { LoginFormInput } from '@/features/auth/login/components/LoginFormInput';
import { useUserStore } from '@/store/user/user-store';

export interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { setUserId } = useUserStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { email, password } = data;

    const resp = await login(email, password);

    if (!resp.ok) {
      if (resp.message === 'User with that email not found') {
        setError('email', {
          type: 'manual',
          message: 'User with that email not found',
        });
      } else if (resp.message === 'Incorrect password') {
        setError('password', {
          type: 'manual',
          message: 'Incorrect password',
        });
      }

      return;
    }

    const userId = resp.user!.id;
    setUserId(userId);

    router.push('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-3 w-full'>
        <LoginFormInput
          value='email'
          register={register}
          errors={errors.email}
          placeholder='Email'
          type='email'
          watch={watch}
        />

        <LoginFormInput
          value='password'
          register={register}
          errors={errors.password}
          placeholder='Password'
          type={!showPassword ? 'password' : 'text'}
          watch={watch}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <div className='w-full px-10 py-2'>
          <button
            type='submit'
            disabled={!isValid}
            className={`${isValid ? 'bg-button hover:bg-button-hover cursor-pointer' : 'bg-button-disabled'} w-full rounded-lg px-4 py-[7px] text-sm font-semibold text-white`}
          >
            Log in
          </button>
        </div>
      </form>
    </>
  );
};
