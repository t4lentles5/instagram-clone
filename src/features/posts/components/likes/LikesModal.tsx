import { useEffect, useRef } from 'react';
import Link from 'next/link';

import { Comment, Like } from '@/core/shared/interfaces/post.interface';

import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';

import { XIcon } from '@/core/shared/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  likes: Like[] | Comment['commentLike'];
}

export const LikesModal = ({ isOpen, onClose, likes }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className='bg-ig-elevated-background backdrop:bg-overlay-alpha-80 text-ig-primary-text top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl'
      onCancel={onClose}
      onClick={(e) => {
        const dialog = dialogRef.current;
        e.stopPropagation();
        if (dialog && e.target === dialog) onClose();
      }}
    >
      <div className='w-full'>
        <div className='border-ig-elevated-separator flex h-[43px] border-b'>
          <div className='w-12'></div>
          <h2 className='grid grow place-items-center font-semibold'>Likes</h2>
          <button
            onClick={() => onClose()}
            className='grid w-12 cursor-pointer place-items-center'
          >
            <XIcon />
          </button>
        </div>
        <div className='h-[356px] overflow-y-auto'>
          {likes.map((like) => (
            <div key={like.id} className='flex w-full items-center px-4 py-2'>
              <ProfilePhoto
                profile_photo={like.user.profile_photo}
                imageSize={{
                  size: 'w-11',
                }}
                backgroundDivSize={{
                  size: 'w-12',
                }}
                borderDivSize={{
                  size: 'w-[52px]',
                }}
              />

              <div className='ml-3 flex grow flex-col text-sm'>
                <span>
                  <Link
                    className='max-w-36 truncate overflow-hidden font-semibold'
                    href={`${like.user.username}`}
                  >
                    {like.user.username}
                  </Link>
                </span>
                <span className='text-ig-secondary-text max-w-36 truncate overflow-hidden'>
                  {like.user.fullname}
                </span>
              </div>

              <button className='bg-ig-primary-button hover:bg-ig-primary-button-hover active:bg-ig-primary-button-pressed text-web-always-white ml-3 cursor-pointer rounded-lg px-5 py-[6px] text-sm font-semibold'>
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};
