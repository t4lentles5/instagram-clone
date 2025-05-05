'use client';

import { useState, useCallback, useEffect } from 'react';

import { Like } from '@/core/shared/interfaces/post.interface';
import { Comment } from '@/core/shared/interfaces/post.interface';
import { LikesModal } from '@/features/posts/components/LikesModal';

export function useLikesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [likes, setLikes] = useState<Like[] | Comment['commentLike']>([]);

  const openModal = useCallback((newLikes: Like[] | Comment['commentLike']) => {
    setLikes(newLikes);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

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

  const Modal = (
    <LikesModal isOpen={isOpen} onClose={closeModal} likes={likes} />
  );

  return {
    openModal,
    closeModal,
    Modal,
  };
}
