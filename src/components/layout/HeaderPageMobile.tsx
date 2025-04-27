'use client';

import { useRouter } from 'next/navigation';

import { BackIcon } from '@/components/icons/BackIcon';
import { OptionsVerticalIcon } from '../icons/OptionsVerticalIcon';

interface Props {
  username: string;
}

export const HeaderPageMobile = ({ username }: Props) => {
  const router = useRouter();

  return (
    <header className='bg-background border-border fixed top-0 z-50 flex w-full items-center border-b px-4 py-3 md:hidden'>
      <button
        onClick={() => router.back()}
        className='fixed left-3 cursor-pointer'
      >
        <BackIcon />
      </button>
      <p className='w-full text-center font-semibold'>{username}</p>
      <button className='fixed right-3 cursor-pointer'>
        <OptionsVerticalIcon />
      </button>
    </header>
  );
};
