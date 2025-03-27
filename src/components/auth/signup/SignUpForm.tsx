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

interface FormInputs {
  email: string;
  password: string;
  fullname: string;
  username: string;
}

export const SignUpForm = () => {
  const router = useRouter();

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
      <form
        className='flex flex-col gap-3 mt-3 w-ful'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-3'>
          <div
            className={`input-container ${
              errors.email ? ' border-red-500' : 'border-separator'
            }`}
          >
            <label className='input-label'>
              {emailValue && <span className='input-label-span'>Email</span>}

              <input
                type='email'
                className={`input ${emailValue && 'text-xs'}`}
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
              <div className='flex items-center justify-center w-1/5'>
                {errors.email ? (
                  <XCircle size={24} className='text-red-500' />
                ) : (
                  <CheckCircle size={24} className='text-foregroundSecondary' />
                )}
              </div>
            )}
          </div>
          {errors.email && (
            <span className='text-xs text-red-500'>{errors.email.message}</span>
          )}
        </div>

        <div className='flex flex-col gap-3'>
          <div
            className={`input-container ${
              errors.password ? ' border-red-500' : 'border-separator'
            }`}
          >
            <label className='input-label'>
              {passwordValue && (
                <span className='input-label-span'>Password</span>
              )}

              <input
                type='password'
                className={`input ${emailValue && 'text-xs'}`}
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
              <div className='flex items-center justify-center w-1/5'>
                {errors.password ? (
                  <XCircle size={24} className='text-red-500' />
                ) : (
                  <CheckCircle size={24} className='text-foregroundSecondary' />
                )}
              </div>
            )}
          </div>
          {errors.password && (
            <span className='text-xs text-red-500'>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className='flex flex-col gap-3'>
          <div
            className={`input-container ${
              errors.fullname ? ' border-red-500' : 'border-separator'
            }`}
          >
            <label className='input-label'>
              {fullnameValue && (
                <span className='input-label-span'>Fullname</span>
              )}

              <input
                type='text'
                className={`input ${fullnameValue && 'text-xs'}`}
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
              <div className='flex items-center justify-center w-1/5'>
                {errors.fullname ? (
                  <XCircle size={24} className='text-red-500' />
                ) : (
                  <CheckCircle size={24} className='text-foregroundSecondary' />
                )}
              </div>
            )}
          </div>
          {errors.fullname && (
            <span className='text-xs text-red-500'>
              {errors.fullname.message}
            </span>
          )}
        </div>

        <div className='flex flex-col gap-3'>
          <div
            className={`input-container ${
              errors.username ? ' border-red-500' : 'border-separator'
            }`}
          >
            <label className='input-label'>
              {usernameValue && (
                <span className='input-label-span'>Username</span>
              )}

              <input
                type='text'
                className={`input ${usernameValue && 'text-xs'}`}
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
              <div className='flex items-center justify-center w-1/5'>
                {errors.username ? (
                  <XCircle size={24} className='text-red-500' />
                ) : (
                  <CheckCircle size={24} className='text-foregroundSecondary' />
                )}
              </div>
            )}
          </div>
          {errors.username && (
            <span className='text-xs text-red-500'>
              {errors.username.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          disabled={!isValid}
          className={`${isValid ? 'button-primary' : 'button-disabled'} `}
        >
          Sign up
        </button>
      </form>
    </>
  );
};
