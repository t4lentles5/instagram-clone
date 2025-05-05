import { Dispatch, RefObject, SetStateAction } from 'react';

import { filters } from '@/features/posts/utils/filters';

interface Props {
  modalOptionsRef: RefObject<HTMLDialogElement | null>;
  setIsModalOptionsOpen: Dispatch<SetStateAction<boolean>>;
  setShowEditPost: Dispatch<SetStateAction<boolean>>;
  setFilterStrengths: Dispatch<SetStateAction<Record<string, number>>>;
  onClose: () => void;
  clearAll: () => void;
}

export const CloseModalOptions = ({
  modalOptionsRef,
  setIsModalOptionsOpen,
  setShowEditPost,
  setFilterStrengths,
  onClose,
  clearAll,
}: Props) => {
  return (
    <>
      <dialog
        ref={modalOptionsRef}
        onCancel={() => setIsModalOptionsOpen(false)}
        className='bg-ig-elevated-background backdrop:bg-overlay-alpha-80 fixed top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl'
      >
        <div className='flex flex-col items-center text-center'>
          <div className='p-6'>
            <h3 className='text-ig-primary-text mb-1 text-xl'>Discard post?</h3>
            <p className='text-ig-secondary-text text-sm'>
              If you leave, your edits won&apos;t be saved.
            </p>
          </div>

          <div className='border-ig-elevated-separator flex w-full flex-col border-t'>
            <button
              className='text-ig-badge h-12 w-full cursor-pointer px-2 py-1 text-sm font-bold'
              onClick={() => {
                setIsModalOptionsOpen(false);
                setShowEditPost(false);
                clearAll();
                setFilterStrengths(
                  filters.reduce(
                    (acc, filter) => {
                      acc[filter.name] = 100;
                      return acc;
                    },
                    {} as Record<string, number>,
                  ),
                );
                onClose();
              }}
            >
              Discard
            </button>

            <button
              className='text-ig-primary-text border-ig-elevated-separator h-12 w-full cursor-pointer border-t px-2 py-1 text-sm'
              onClick={() => setIsModalOptionsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
