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
    if (isOpen) {
      const originalStyles = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        position: document.body.style.position,
        top: document.body.style.top,
        width: document.body.style.width,
      };

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      const scrollY = window.scrollY;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = originalStyles.overflow;
        document.body.style.paddingRight = originalStyles.paddingRight;
        document.body.style.position = originalStyles.position;
        document.body.style.top = originalStyles.top;
        document.body.style.width = originalStyles.width;

        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

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
