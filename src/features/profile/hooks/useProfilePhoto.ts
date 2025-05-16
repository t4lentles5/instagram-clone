'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { deleteProfilePhoto } from '@/features/profile/actions/delete-profile-photo';
import { User } from '@/core/shared/interfaces/user.interface';
import { changeProfilePhoto } from '../actions/change-profile-photo';

export function useProfilePhoto(user: User) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const file = e.target.files?.[0];
    if (!file) {
      setIsLoading(false);
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString('base64');

      await changeProfilePhoto(
        base64Image,
        user.username,
        user?.profile_photo_id ?? undefined,
      );

      await queryClient.invalidateQueries({ queryKey: ['authenticatedUser'] });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      router.refresh();
    } catch (error) {
      console.error('Error uploading profile photo:', error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleRemovePhoto = async () => {
    setIsLoading(true);

    try {
      if (user.profile_photo_id) {
        await deleteProfilePhoto(user.profile_photo_id, user.id);

        await queryClient.invalidateQueries({
          queryKey: ['authenticatedUser'],
        });
      }

      setIsOpen(false);

      router.refresh();
    } catch (error) {
      console.error('Error removing profile photo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fileInputRef,
    dialogRef,
    isOpen,
    setIsOpen,
    isLoading,
    handleUpload,
    handleRemovePhoto,
  };
}
