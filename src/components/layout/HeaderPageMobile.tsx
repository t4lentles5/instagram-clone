'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BackIcon } from '@/assets/icons/BackIcon';

export const HeaderPageMobile = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  return (
    <header className='fixed top-0 z-50 flex items-center w-full px-4 py-3 border-b bg-background md:hidden border-separator'>
      <Link href='#' onClick={() => router.back()} className='fixed'>
        <BackIcon />
      </Link>
      <p className='w-full font-semibold text-center'>{children}</p>
    </header>
  );
};
