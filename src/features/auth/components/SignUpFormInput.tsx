import { Dispatch, SetStateAction } from 'react';
import { FieldError, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { XCircle } from 'phosphor-react';
import { SignUpFormInputs } from '@/features/auth/components/SignUpForm';

interface Props {
  value: 'email' | 'password' | 'fullname' | 'username';
  register: UseFormRegister<SignUpFormInputs>;
  errors: FieldError | undefined;
  placeholder: string;
  type: string;
  watch: UseFormWatch<SignUpFormInputs>;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: { value: number; message: string };
}

export const SignUpFormInput = ({
  value,
  register,
  errors,
  placeholder,
  type,
  watch,
  showPassword,
  setShowPassword,
  pattern,
  minLength,
  maxLength,
}: Props) => {
  const inputValue = watch(value);

  return (
    <>
      <div className='mx-10 mb-[6px]'>
        <div
          className={`bg-ig-secondary-background flex h-[36px] flex-col gap-3 rounded-[3px] border ${
            errors ? 'border-ig-badge' : 'border-ig-stroke-input'
          }`}
        >
          <div className='bg-ig-secondary-background flex h-10 w-full gap-3 text-xs'>
            <label className='text-ig-secondary-text flex h-full w-4/5 flex-col items-center px-2'>
              {inputValue && (
                <span className='bg-ig-secondary-background text-ig-secondary-text flex w-full grow items-center text-[9px]'>
                  {placeholder}
                </span>
              )}

              <input
                type={type}
                className={`bg-ig-secondary-background text-ig-primary-text bg-input-bg h-4 w-full grow border-none focus:outline-hidden ${inputValue && 'text-xs leading-3'}`}
                placeholder={placeholder}
                {...register(value, {
                  required: {
                    value: true,
                    message: `${placeholder} is required.`,
                  },
                  pattern: pattern,
                  minLength: minLength,
                  maxLength: maxLength,
                })}
              />
            </label>

            {value === 'password' && setShowPassword && inputValue && (
              <div className='flex w-1/4 items-center justify-center'>
                <button
                  className='cursor-pointer pl-2 font-semibold'
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            )}

            {errors && (
              <div className='flex w-1/5 items-center justify-center'>
                <XCircle size={24} className='text-ig-badge' />
              </div>
            )}
          </div>
        </div>

        {errors && (
          <span className='text-ig-badge text-xs'>{errors.message}</span>
        )}
      </div>
    </>
  );
};
