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
    <header className='sticky top-0 flex items-center w-full border-b md:hidden px-4 py-3 bg-background border-separator'>
      <Link href='#' onClick={() => router.back()} className='fixed'>
        <BackIcon />
      </Link>
      <p className='w-full text-center font-semibold'>{children}</p>
    </header>
  );
};
