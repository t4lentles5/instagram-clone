'use client';

import { useState } from 'react';

import { NewPostModal } from '@/features/posts/components/new-post/NewPostModal';
import { CameraCircleIcon } from '@/features/posts/icons';

export const NoPosts = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='mx-11 my-[60px] flex h-full flex-col items-center justify-center'>
        <button className='cursor-pointer' onClick={() => setIsOpen(true)}>
          <CameraCircleIcon />
        </button>
        <p className='my-6 text-center text-3xl font-extrabold'>Share Photos</p>

        <p className='mb-4 text-center text-sm font-normal'>
          When you share photos, they will appear on your profile.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className='text-ig-primary-button hover:text-ig-link active:text-ig-primary-button-pressed cursor-pointer text-sm font-semibold'
        >
          Share your first photo
        </button>
      </div>

      <NewPostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
