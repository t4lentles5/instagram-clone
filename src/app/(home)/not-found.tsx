import { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Page not found • Instagram',
  description: 'Page not found',
};

export default function NotFound() {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-full p-10 grow'>
        <h2 className='mb-10 text-2xl text-center'>
          Sorry, this page isn&apos;t available.
        </h2>
        <p>
          The link you followed may be broken, or the page may have been
          removed. <Link href={'/'}>Go back to Instagram.</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
