'use client';

import { useRouter } from 'next/navigation';

import { BackIcon, OptionsVerticalIcon } from '@/core/shared/icons';

interface Props {
  username: string;
}

export const HeaderPageMobile = ({ username }: Props) => {
  const router = useRouter();

  return (
    <header className='bg-ig-primary-background border-ig-separator fixed top-0 z-50 flex w-full items-center border-b px-4 py-3 md:hidden'>
      <button
        onClick={() => router.back()}
        className='active:text-ig-primary-text-pressed fixed left-3 cursor-pointer'
      >
        <BackIcon />
      </button>
      <p className='w-full text-center font-semibold'>{username}</p>
      <button className='active:text-ig-primary-text-pressed fixed right-3 cursor-pointer'>
        <OptionsVerticalIcon />
      </button>
    </header>
  );
};
