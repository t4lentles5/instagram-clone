'use client';

import { useState, useCallback } from 'react';

import { Like } from '@/interfaces/post.interface';
import { Comment } from '@/interfaces/post.interface';
import { LikesModal } from '@/components/ui/post/LikesModal';

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

  const Modal = (
    <LikesModal isOpen={isOpen} onClose={closeModal} likes={likes} />
  );

  return {
    openModal,
    closeModal,
    Modal,
  };
}
