import Link from 'next/link';
import { HeaderPageMobile } from '@/components/ui/HeaderPageMobile';
import { Footer } from '@/components/ui/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found / Instagram',
  description: 'Page not found',
};

export default function NotFound() {
  return (
    <>
      <div className='flex flex-col items-center justify-between h-full text-text'>
        <div className='h-full flex items-center justify-center flex-col p-10'>
          <h2 className='mb-10 text-3xl text-center'>
            Sorry, this page isn&apos;t available.
          </h2>
          <p>
            The link you followed may be broken, or the page may have been
            removed. <Link href={'/'}>Go back to Instagram.</Link>
          </p>
        </div>
        <Footer />
      </div>
      <HeaderPageMobile>User not found</HeaderPageMobile>
    </>
  );
}
