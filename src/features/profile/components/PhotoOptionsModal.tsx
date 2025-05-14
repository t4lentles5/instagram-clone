import { RefObject } from 'react';

interface Props {
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
  handleRemovePhoto: () => Promise<void>;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export const PhotoOptionsModal = ({
  dialogRef,
  onClose,
  handleRemovePhoto,
  fileInputRef,
}: Props) => {
  return (
    <>
      <dialog
        ref={dialogRef}
        className='bg-ig-elevated-background backdrop:bg-overlay-alpha-80 top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl'
        onCancel={onClose}
        onClick={(e) => {
          const dialog = dialogRef.current;
          e.stopPropagation();
          if (dialog && e.target === dialog) onClose();
        }}
      >
        <div className='h-[60px] w-[400px]'>
          <h3 className='text-ig-primary-text pt-8 text-center text-xl leading-3.5'>
            Change Profile Photo
          </h3>
        </div>

        <div className='mt-4 w-full'>
          <button
            className='border-ig-elevated-separator text-ig-primary-button active:bg-ig-option-pressed h-12 w-full cursor-pointer border-t px-2 py-1 text-[14px] font-bold'
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            Upload Photo
          </button>

          <button
            className='border-ig-elevated-separator text-ig-badge active:bg-ig-option-pressed h-12 w-full cursor-pointer border-t px-2 py-1 text-[14px] font-bold'
            onClick={handleRemovePhoto}
          >
            Remove Current Photo
          </button>
          <button
            className='border-ig-elevated-separator text-ig-primary-text active:bg-ig-option-pressed h-12 w-full cursor-pointer border-t px-2 py-1 text-[14px]'
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
};
