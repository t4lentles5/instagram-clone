'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { CheckCircle, XCircle } from 'phosphor-react';
import {
  emailVerify,
  registerUser,
  usernameVerify,
} from '@/actions/auth/register';
import { login } from '@/actions/auth/login';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FormInputs {
  email: string;
  password: string;
  fullname: string;
  username: string;
}

export const SignUpForm = () => {
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
    const { email, password, fullname, username } = data;

    const emailResp = await emailVerify(email);
    const usernameResp = await usernameVerify(username);

    if (!emailResp.ok) {
      setError('email', {
        type: 'manual',
        message: emailResp.message,
      });

      return;
    }

    if (!usernameResp.ok) {
      setError('username', {
        type: 'manual',
        message: usernameResp.message,
      });

      return;
    }

    const { ok } = await registerUser(email, password, fullname, username);

    if (!ok) {
      return;
    }

    await login(email, password);
    router.push('/');
  };

  const emailValue = watch('email');
  const passwordValue = watch('password');
  const fullnameValue = watch('fullname');
  const usernameValue = watch('username');

  return (
    <>
      <form className="w-ful mt-3 mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="border-input-border bg-input-bg mx-10 mb-[6px] flex h-[36px] flex-col gap-3 rounded-[3px] border">
          <div
            className={`bg-input-bg flex h-10 w-full gap-3 text-xs ${
              errors.email ? 'border-red-500' : 'border-border'
            }`}
          >
            <label className="flex h-full w-4/5 flex-col items-center px-2">
              {emailValue && (
                <span className="bg-input-bg text-secondary flex w-full items-center text-[9px]">
                  Email
                </span>
              )}

              <input
                type="email"
                className={`text-primary bg-input-bg h-full w-full border-none focus:outline-hidden ${emailValue && 'text-xs leading-3'}`}
                placeholder={'Email'}
                {...register('email', {
                  required: { value: true, message: 'Email is required.' },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email address.',
                  },
                })}
              />
            </label>

            {emailValue && (
              <div className="flex w-1/5 items-center justify-center">
                {errors.email ? (
                  <XCircle size={24} className="text-red-500" />
                ) : (
                  <CheckCircle size={24} className="" />
                )}
              </div>
            )}
          </div>
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="border-input-border bg-input-bg mx-10 mb-[6px] flex h-[36px] flex-col gap-3 rounded-[3px] border">
          <div
            className={`bg-input-bg flex h-10 w-full gap-3 text-xs ${
              errors.password ? 'border-red-500' : 'border-border'
            }`}
          >
            <label className="flex h-full w-4/5 flex-col items-center px-2">
              {passwordValue && (
                <span className="bg-input-bg text-secondary flex w-full items-center text-[9px]">
                  Password
                </span>
              )}

              <input
                type={!showPassword ? 'password' : 'text'}
                className={`text-primary bg-input-bg h-full w-full border-none focus:outline-hidden ${passwordValue && 'text-xs leading-3'}`}
                placeholder={'Password'}
                {...register('password', {
                  required: { value: true, message: 'Password is required.' },
                  minLength: {
                    value: 6,
                    message: 'Password must have at least 6 characters.',
                  },
                })}
              />
            </label>

            {passwordValue && (
              <div className="flex w-1/4 items-center justify-center">
                {errors.password ? (
                  <XCircle size={24} className="text-red-500" />
                ) : (
                  <CheckCircle size={24} className="" />
                )}

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
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="border-input-border bg-input-bg mx-10 mb-[6px] flex h-[36px] flex-col gap-3 rounded-[3px] border">
          <div
            className={`bg-input-bg flex h-10 w-full gap-3 text-xs ${
              errors.fullname ? 'border-red-500' : 'border-border'
            }`}
          >
            <label className="flex h-full w-4/5 flex-col items-center px-2">
              {fullnameValue && (
                <span className="bg-input-bg text-secondary flex w-full items-center text-[9px]">
                  Fullname
                </span>
              )}

              <input
                type="text"
                className={`text-primary bg-input-bg h-full w-full border-none focus:outline-hidden ${fullnameValue && 'text-xs leading-3'}`}
                placeholder={'Fullname'}
                {...register('fullname', {
                  required: { value: true, message: 'Fullname is required.' },
                  minLength: {
                    value: 3,
                    message: 'Fullname must be at least 3 characters long.',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Fullname cannot exceed 20 characters.',
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Fullname can only contain letters and spaces.',
                  },
                })}
              />
            </label>

            {fullnameValue && (
              <div className="flex w-1/5 items-center justify-center">
                {errors.fullname ? (
                  <XCircle size={24} className="text-red-500" />
                ) : (
                  <CheckCircle size={24} className="" />
                )}
              </div>
            )}
          </div>
          {errors.fullname && (
            <span className="text-xs text-red-500">
              {errors.fullname.message}
            </span>
          )}
        </div>

        <div className="border-input-border bg-input-bg mx-10 mb-[6px] flex h-[36px] flex-col gap-3 rounded-[3px] border">
          <div
            className={`bg-input-bg flex h-10 w-full gap-3 text-xs ${
              errors.username ? 'border-red-500' : 'border-border'
            }`}
          >
            <label className="flex h-full w-4/5 flex-col items-center px-2">
              {usernameValue && (
                <span className="bg-input-bg text-secondary flex w-full items-center text-[9px]">
                  Username
                </span>
              )}

              <input
                type="text"
                className={`text-primary bg-input-bg h-full w-full border-none focus:outline-hidden ${usernameValue && 'text-xs leading-3'}`}
                placeholder={'Username'}
                {...register('username', {
                  required: { value: true, message: 'Username is required.' },
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters long.',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Username cannot exceed 20 characters.',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*$/,
                    message:
                      'Username can only contain letters, numbers, dots and underscores. It cannot start or end with a special character.',
                  },
                })}
              />
            </label>

            {usernameValue && (
              <div className="flex w-1/5 items-center justify-center">
                {errors.username ? (
                  <XCircle size={24} className="text-red-500" />
                ) : (
                  <CheckCircle size={24} className="" />
                )}
              </div>
            )}
          </div>
          {errors.username && (
            <span className="text-xs text-red-500">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="w-full px-10 py-2">
          <button
            type="submit"
            disabled={!isValid}
            className={`${isValid ? 'bg-button hover:bg-button-hover cursor-pointer' : 'bg-button-disabled'} w-full rounded-lg px-4 py-[7px] text-sm font-semibold text-white`}
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
};
