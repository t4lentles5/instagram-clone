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
    <main className="w-[350px] py-3">
      <div className="border-border flex w-[350px] flex-col border py-[10px]">
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
        <p className="text-secondary mx-10 mb-[10px] text-center font-semibold">
          Sign up to see photos and videos from your friends.
        </p>
        <button className="text-blue mt-2 mb-5 font-semibold">
          Sign in as a guest
        </button>

        <OrComponent />

        <SignUpForm />
      </div>
      <div className="border-border mt-3 w-[350px] border p-5 text-center">
        <p className="text-sm">Have an account?</p>
        <Link href={'/auth/login'} className="text-blue text-sm font-semibold">
          Log in
        </Link>
      </div>
    </main>
  );
}
