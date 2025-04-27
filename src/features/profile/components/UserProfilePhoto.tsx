'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { User } from '@/interfaces/user.interface';

import { deleteProfilePhoto } from '@/actions/user/delete-profile-photo';

import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { PhotoOptionsModal } from '@/features/profile/components/PhotoOptionsModal';
import styles from '@/features/profile/components/image-loader.module.css';

import { CameraIcon } from '@/features/profile/icons/CameraIcon';
import { useUserStore } from '@/store/user/user-store';

interface Props {
  user: User;
}

export const UserProfilePhoto = ({ user }: Props) => {
  const router = useRouter();
  const { userId } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const file = e.target.files?.[0];
    if (!file) return;

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

      setIsLoading(false);
      router.refresh();

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading profile photo:', error);
    }
  };

  const handleRemovePhoto = async () => {
    setIsLoading(true);

    try {
      if (user.profile_photo_id) {
        await deleteProfilePhoto(user.profile_photo_id, user.id);
      }

      setIsLoading(false);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error removing profile photo:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-[120px] md:max-w-[284px]'>
      <div
        className='relative flex w-full cursor-pointer items-center justify-center rounded-full'
        onClick={() => {
          if (!user.profile_photo && user.id === userId) {
            fileInputRef.current?.click();
          }
        }}
      >
        <ProfilePhoto
          profile_photo={user.profile_photo}
          imageSize={{
            size: 'w-20',
            mdSize: 'md:w-[150px]',
          }}
          backgroundDivSize={{
            size: 'w-[84px]',
            mdSize: 'md:w-[154px]',
          }}
          borderDivSize={{
            size: 'w-[88px]',
            mdSize: 'md:w-[158px]',
          }}
        />

        {user.profile_photo && user.id === userId && (
          <>
            <button
              aria-label='Open photo options'
              className='absolute h-20 w-20 cursor-pointer rounded-full md:h-[150px] md:w-[150px]'
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            ></button>

            {isOpen && (
              <PhotoOptionsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                handleRemovePhoto={handleRemovePhoto}
                fileInputRef={fileInputRef}
              />
            )}
          </>
        )}

        {isLoading && (
          <div className='bg-image-overlay absolute z-50 grid h-20 w-20 place-items-center rounded-full md:h-[150px] md:w-[150px]'>
            <div className={styles.loader}></div>
          </div>
        )}

        {!user.profile_photo && user.id === userId && !isLoading && (
          <div className='bg-image-overlay absolute flex h-20 w-20 items-center justify-center rounded-full md:h-[150px] md:w-[150px]'>
            <CameraIcon />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleUpload}
      />
    </div>
  );
};
