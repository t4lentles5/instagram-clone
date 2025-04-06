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
    <main className="flex h-[650px] w-full justify-center p-8">
      <LoginImages />

      <div className="flex w-[350px] flex-col gap-3 pt-3">
        <div className="border-border flex w-full flex-col gap-3 border py-[10px]">
          <div className="mt-9 mb-3 flex w-full items-center justify-center">
            <i
              data-visualcompletion="css-img"
              aria-label="Instagram"
              role="img"
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

          <button className="text-ig-blue hover:text-ig-blue-hover mt-2 text-sm font-bold">
            Sign in as a guest
          </button>

          <Link href={'/auth/reset-password'} className="text-center text-sm">
            Forgot password?
          </Link>
        </div>

        <div className="border-border w-full border">
          <p className="p-5 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              href={'/auth/signup'}
              className="text-ig-blue text-sm font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
