'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  emailVerify,
  registerUser,
  usernameVerify,
} from '@/actions/auth/register';
import { login } from '@/actions/auth/login';
import { SignUpFormInput } from '@/features/auth/signup/components/SignUpFormInput';

export interface SignUpFormInputs {
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
  } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
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

    const registerResponse = await registerUser(
      email,
      password,
      fullname,
      username,
    );

    if (!registerResponse.ok) {
      return;
    }

    await login(email, password);
    router.push('/');
  };

  return (
    <>
      <form className='w-ful my-5' onSubmit={handleSubmit(onSubmit)}>
        <SignUpFormInput
          value={'email'}
          register={register}
          errors={errors.email}
          placeholder={'Email'}
          type={'email'}
          watch={watch}
          pattern={{
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter a valid email address.',
          }}
        />

        <SignUpFormInput
          value={'password'}
          register={register}
          errors={errors.password}
          placeholder={'Password'}
          type={!showPassword ? 'password' : 'text'}
          watch={watch}
          minLength={{
            value: 6,
            message: 'Password must have at least 6 characters.',
          }}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <SignUpFormInput
          value={'fullname'}
          register={register}
          errors={errors.fullname}
          placeholder={'Fullname'}
          type={'text'}
          watch={watch}
          pattern={{
            value: /^[a-zA-Z\s]+$/,
            message: 'Fullname can only contain letters and spaces.',
          }}
          minLength={{
            value: 3,
            message: 'Fullname must be at least 3 characters long.',
          }}
          maxLength={{
            value: 20,
            message: 'Fullname cannot exceed 20 characters.',
          }}
        />

        <SignUpFormInput
          value={'username'}
          register={register}
          errors={errors.username}
          placeholder={'Username'}
          type={'text'}
          watch={watch}
          pattern={{
            value: /^[a-zA-Z0-9._]+$/,
            message:
              'Username can only contain letters, numbers, dots and underscores. It cannot start or end with a special character.',
          }}
          minLength={{
            value: 3,
            message: 'Username must be at least 3 characters long.',
          }}
          maxLength={{
            value: 20,
            message: 'Username cannot exceed 20 characters.',
          }}
        />

        <div className='w-full px-10 py-2'>
          <button
            type='submit'
            disabled={!isValid}
            className={`${isValid ? 'bg-button hover:bg-button-hover cursor-pointer' : 'bg-button-disabled'} w-full rounded-lg px-4 py-[7px] text-sm font-semibold`}
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
};
