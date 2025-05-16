'use client';

import { useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, closeModal, children }: Props) => {
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
      className='bg-ig-elevated-background backdrop:bg-overlay-alpha-80 text-ig-primary-text fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl'
      onCancel={() => closeModal()}
      onClick={(e) => {
        const dialog = dialogRef.current;
        e.stopPropagation();
        if (dialog && e.target === dialog) closeModal();
      }}
    >
      {children}
    </dialog>
  );
};
