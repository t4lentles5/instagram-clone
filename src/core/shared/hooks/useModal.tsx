'use client';

import { useEffect, useRef, useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return { openModal, closeModal, isOpen };
};
