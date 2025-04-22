import { useEffect, useRef } from 'react';

import { Like } from '@/interfaces/post.interface';
import { XIcon } from '@/components/icons/XIcon';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  likes: Like[];
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
      className='bg-popover backdrop:bg-background-overlay text-primary top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl'
      onCancel={onClose}
      onClick={(e) => {
        const dialog = dialogRef.current;
        e.stopPropagation();
        if (dialog && e.target === dialog) onClose();
      }}
    >
      <div className='w-full'>
        <div className='border-border-popover flex h-[43px] border-b'>
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
                    className='font-semibold'
                    href={`${like.user.username}`}
                  >
                    {like.user.username}
                  </Link>
                </span>
                <span>{like.user.fullname}</span>
              </div>

              <button>Follow</button>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};
