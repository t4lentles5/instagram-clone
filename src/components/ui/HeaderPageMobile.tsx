'use client';

import { CaretLeft } from 'phosphor-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const HeaderPageMobile = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  return (
    <header className='sticky top-0 flex items-center w-full border-b md:hidden h-14 bg-background border-separator'>
      <Link href='#' onClick={() => router.back()} className='fixed'>
        <CaretLeft size={32} strokeWidth={1.5} className='text-text' />
      </Link>
      <p className='w-full text-center text-text'>{children}</p>
    </header>
  );
};
