import { Metadata } from 'next';
import Link from 'next/link';

import { Footer } from '@/core/shared/components/Footer';

export const metadata: Metadata = {
  title: 'Page not found • Instagram',
  description: 'Page not found',
};

export default function NotFound() {
  return (
    <>
      <div className='flex h-full grow flex-col items-center justify-center p-10'>
        <h2 className='mb-10 text-center text-2xl'>
          Sorry, this page isn&apos;t available.
        </h2>
        <p>
          The link you followed may be broken, or the page may have been
          removed.{' '}
          <Link
            href={'/'}
            className='text-ig-colors-button-borderless-text font-semibold'
          >
            Go back to Instagram.
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
