import { useEffect, useRef } from 'react';

import { NewPostMediaIcon } from '@/components/icons/NewPostMediaIcon';
import { XIcon } from '@/components/icons/XIcon';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPostModal = ({ isOpen, onClose }: Props) => {
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
    <>
      {isOpen && (
        <button
          onClick={() => onClose()}
          className='fixed top-4 right-4 z-50 cursor-pointer p-2 text-white'
        >
          <XIcon />
        </button>
      )}

      <dialog
        ref={dialogRef}
        className='bg-popover backdrop:bg-background-overlay fixed top-1/2 left-1/2 w-[516px] -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl'
        onCancel={onClose}
        onClick={(e) => {
          const dialog = dialogRef.current;
          e.stopPropagation();
          if (dialog && e.target === dialog) onClose();
        }}
      >
        <div className='bg-popover flex flex-col rounded-lg'>
          <header className='bg-background text-primary border-popover w-full rounded-t-lg border-b p-2 text-center font-semibold'>
            Create new post
          </header>

          <div className='text-primary flex aspect-square h-full w-full flex-col items-center justify-center p-6'>
            <NewPostMediaIcon />
            <p className='mt-3 text-xl'>Drag photos and videos here</p>
            <button className='hover:bg-button-hover bg-button mt-5 rounded-lg px-4 py-[7px] text-sm font-semibold text-white'>
              Select from computer
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
