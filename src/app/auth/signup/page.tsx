import { Metadata } from 'next';
import Link from 'next/link';
import { SignUpForm } from '@/components/auth/signup/SignUpForm';
import { OrComponent } from '@/components/ui/OrComponent';

export const metadata: Metadata = {
  title: 'Sign Up • Instagram',
  description: 'Sign up for an Instagram account',
};

export default function SignUpPage() {
  return (
    <main className='w-[350px] py-3'>
      <div className='border flex flex-col p-10 gap-3 border-separator w-[350px]'>
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
        <p className='font-bold text-center text-foregroundSecondary'>
          Sign up to see photos and videos from your friends.
        </p>
        <button className='mt-2 mb-5 font-bold text-buttonPrimary'>
          Sign in as a guest
        </button>

        <OrComponent />

        <SignUpForm />
      </div>
      <div className='border border-separator p-5 mt-3 text-center w-[350px]'>
        <p className=''>Have an account?</p>
        <Link href={'/auth/login'} className='font-semibold text-buttonPrimary'>
          Log in
        </Link>
      </div>
    </main>
  );
}
