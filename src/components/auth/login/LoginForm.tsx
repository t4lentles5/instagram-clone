'use client';

import { login } from '@/actions/auth/login';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
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

    router.push('/');
  };

  const emailValue = watch('email');
  const passwordValue = watch('password');

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 w-full">
        <div className="border-input-border bg-input-bg mx-10 mb-[6px] flex h-[36px] flex-col gap-3 rounded-[3px] border">
          <div className="bg-input-bg flex h-10 w-full gap-3 text-xs">
            <label className="flex h-full w-4/5 flex-col items-center px-2">
              {emailValue && (
                <span className="bg-input-bg text-secondary flex w-full items-center text-[9px]">
                  Email
                </span>
              )}

              <input
                type="email"
                id="email"
                className={`text-primary bg-input-bg h-full w-full border-none focus:outline-hidden ${emailValue && 'text-xs leading-3'}`}
                placeholder="Email"
                {...register('email', {
                  required: { value: true, message: 'Email is required.' },
                })}
              />
            </label>
          </div>
        </div>

        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}

        <div className="border-input-border bg-input-bg mx-10 mb-[6px] flex h-[36px] flex-col gap-3 rounded-[3px] border">
          <div className="bg-input-bg flex h-10 w-full gap-3 text-xs">
            <label className="flex h-full w-4/5 flex-col items-center px-2">
              {passwordValue && (
                <span className="bg-input-bg text-secondary flex w-full items-center text-[9px]">
                  Password
                </span>
              )}

              <input
                type={!showPassword ? 'password' : 'text'}
                id="password"
                className={`text-primary bg-input-bg h-full w-full border-none focus:outline-hidden ${emailValue && 'text-xs leading-3'}`}
                placeholder={'Password'}
                {...register('password', {
                  required: { value: true, message: 'Password is required.' },
                })}
              />
            </label>

            {passwordValue && (
              <div className="flex w-1/4 items-center justify-center">
                <button
                  className="pl-2 font-semibold"
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            )}
          </div>
        </div>

        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}

        <div className="w-full px-10 py-2">
          <button
            type="submit"
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
