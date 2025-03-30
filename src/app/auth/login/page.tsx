import Link from 'next/link';
import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login/LoginForm';
import { LoginImages } from '@/components/auth/login/LoginImages';
import { OrComponent } from '@/components/ui/OrComponent';

export const metadata: Metadata = {
  title: 'Login • Instagram',
  description: 'Login to your Instagram account',
};

export default function LoginPage() {
  return (
    <main className='flex justify-center w-full h-[650px] p-8'>
      <LoginImages />

      <div className='flex flex-col w-[350px] gap-3 p-3'>
        <div className='flex flex-col w-full gap-3 p-10 border border-separator'>
          <div className='flex items-center justify-center w-full h-20'>
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

          <button className='mt-2 font-bold text-buttonPrimary'>
            Sign in as a guest
          </button>

          <Link href={'/auth/reset-password'} className='text-center'>
            Forgot password?
          </Link>
        </div>

        <div className='w-full border border-separator'>
          <p className='p-5 text-center'>
            Don&apos;t have an account?{' '}
            <Link
              href={'/auth/signup'}
              className='font-semibold text-buttonPrimary'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
