import { RefObject, useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleRemovePhoto: () => Promise<void>;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export const PhotoOptionsModal = ({
  isOpen,
  onClose,
  handleRemovePhoto,
  fileInputRef,
}: Props) => {
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
      <dialog
        ref={dialogRef}
        className='bg-popover top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl backdrop:bg-black/50'
        onCancel={onClose}
        onClick={(e) => {
          const dialog = dialogRef.current;
          e.stopPropagation();
          if (dialog && e.target === dialog) onClose();
        }}
      >
        <div className='m-8'>
          <h3 className='text-primary text-center text-xl leading-3.5'>
            Change Profile Photo
          </h3>
        </div>

        <div className='mt-4 w-full'>
          <button
            className='border-border-popover text-blue h-12 w-full cursor-pointer border-t px-2 py-1 text-[14px] font-bold'
            onClick={() => {
              onClose();
              fileInputRef.current?.click();
            }}
          >
            Upload Photo
          </button>

          <button
            className='border-border-popover text-red h-12 w-full cursor-pointer border-t px-2 py-1 text-[14px] font-bold'
            onClick={handleRemovePhoto}
          >
            Remove Current Photo
          </button>
          <button
            className='border-border-popover text-primary h-12 w-full cursor-pointer border-t px-2 py-1 text-[14px]'
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
};
