'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit, watch } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };
  const emailValue = watch('email');
  const passwordValue = watch('password');

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 mt-3 w-ful'
      >
        <div className='flex flex-col gap-3'>
          <div className='input-container border-separator'>
            <label className='input-label'>
              {emailValue && (
                <span className='input-label-span'>Mobile Number or Email</span>
              )}

              <input
                type='email'
                id='email'
                className={`input ${emailValue && 'text-xs'}`}
                placeholder={'Email'}
                {...register('email', {
                  required: { value: true, message: 'Email is required.' },
                })}
              />
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='input-container border-separator'>
            <label className='input-label'>
              {passwordValue && (
                <span className='input-label-span'>Password</span>
              )}

              <input
                type='password'
                id='password'
                className={`input ${emailValue && 'text-xs'}`}
                placeholder={'Password'}
                {...register('password', {
                  required: { value: true, message: 'Password is required.' },
                })}
              />
            </label>
          </div>
        </div>

        <button
          type='submit'
          className='p-2 mt-2 mb-4 font-bold text-white rounded-lg bg-buttonColor hover:bg-buttonHover'
        >
          Log in
        </button>
      </form>
    </>
  );
};
