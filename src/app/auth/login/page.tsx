import Link from 'next/link';
import { Metadata } from 'next';
import { LoginForm } from '@/auth/login/components/LoginForm';
import { LoginImages } from '@/auth/login/components/LoginImages';
import { OrComponent } from '@/auth/components/OrComponent';

export const metadata: Metadata = {
  title: 'Login • Instagram',
  description: 'Login to your Instagram account',
};

export default function LoginPage() {
  return (
    <main className='flex h-[650px] w-full justify-center p-8'>
      <LoginImages />

      <div className='flex w-[350px] flex-col gap-3 pt-3'>
        <div className='border-ig-elevated-separator flex w-full flex-col gap-3 border pt-[10px] pb-5'>
          <div className='mt-9 mb-3 flex w-full items-center justify-center'>
            <i
              data-visualcompletion='css-img'
              aria-label='Instagram'
              role='img'
              style={{
                backgroundImage:
                  'url("https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png")',
                backgroundPosition: '0px 0px',
                backgroundSize: 'auto',
                width: '175px',
                height: '51px',
                backgroundRepeat: 'no-repeat',
                display: 'inline-block',
              }}
            ></i>
          </div>

          <LoginForm />

          <OrComponent />

          <button className='text-ig-primary-button active:text-ig-primary-button-disabled mt-2 cursor-pointer text-sm font-bold'>
            Sign in as a guest
          </button>

          <Link
            href={'/auth/reset-password'}
            className='text-ig-link active:text-ig-link-pressed text-center text-sm'
          >
            Forgot password?
          </Link>
        </div>

        <div className='border-ig-elevated-separator w-full border'>
          <p className='p-5 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link
              href={'/auth/signup'}
              className='text-ig-primary-button active:text-ig-primary-button-disabled text-sm font-semibold'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
