'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { deleteProfilePhoto } from '@/actions/user/delete-profile-photo';
import { User } from '@/shared/interfaces/user.interface';

export function useProfilePhoto(user: User) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const file = e.target.files?.[0];
    if (!file) {
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('username', user.username);

      if (user.profile_photo_id) {
        formData.append('profile_photo_id', user.profile_photo_id);
      }

      const res = await fetch('/api/users/upload-profile-photo', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload photo');
      }

      router.refresh();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading profile photo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePhoto = async () => {
    setIsLoading(true);

    try {
      if (user.profile_photo_id) {
        await deleteProfilePhoto(user.profile_photo_id, user.id);
      }

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error('Error removing profile photo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fileInputRef,
    isOpen,
    setIsOpen,
    isLoading,
    handleUpload,
    handleRemovePhoto,
  };
}
