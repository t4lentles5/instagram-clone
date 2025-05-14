import { useEffect, useRef, useState } from 'react';

import { useNewPostStore } from '../store/new-post-store';

export const useNewPostModal = () => {
  const { previewUrls } = useNewPostStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOptionsOpen, setIsModalOptionsOpen] = useState(false);

  const newPostModalRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalOptionsRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
    const dialog = newPostModalRef.current;
    const dialogOptions = modalOptionsRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open && !isModalOptionsOpen) {
      dialog.close();
    }

    if (isModalOptionsOpen && dialogOptions && !dialogOptions.open) {
      dialogOptions.showModal();
    }

    if (!isModalOptionsOpen && dialogOptions?.open) {
      dialogOptions.close();
    }
  }, [isOpen, isModalOptionsOpen]);

  const handleCloseAttempt = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (previewUrls.length === 0) {
      closeModal();
    } else {
      setIsModalOptionsOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isModalOptionsOpen) {
        e.preventDefault();
        if (previewUrls.length === 0) {
          closeModal();
        } else {
          setIsModalOptionsOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isModalOptionsOpen, previewUrls]);

  return {
    isOpen,
    openModal,
    closeModal,
    isModalOptionsOpen,
    setIsModalOptionsOpen,
    newPostModalRef,
    fileInputRef,
    modalOptionsRef,
    handleCloseAttempt,
  };
};
