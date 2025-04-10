'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/interfaces/user.interface';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { deleteProfilePhoto } from '@/actions/user/delete-profile-photo';
import { CameraIcon } from '@/assets/icons/profile/CameraIcon';
import styles from '@/features/profile/OwnProfile/components/image-loader.module.css';
import { PhotoOptionsModal } from '@/features/profile/OwnProfile/components/PhotoOptionsModal';

interface Props {
  user: User;
}

export const OwnProfilePhoto = ({ user }: Props) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
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

      console.log(res);

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
        setIsLoading(true);
        await deleteProfilePhoto(user.profile_photo_id, user.id);
      }

      setIsLoading(false);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error removing profile photo:', error);
    }
  };

  return (
    <div className="w-full max-w-[120px] md:max-w-[284px]">
      <div
        className="relative flex w-full cursor-pointer items-center justify-center rounded-full"
        onClick={() => {
          if (!user.profile_photo) {
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

        {user.profile_photo && (
          <>
            <button
              className="absolute h-20 w-20 cursor-pointer rounded-full md:h-[150px] md:w-[150px]"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            ></button>

            {open && (
              <PhotoOptionsModal
                setOpen={setOpen}
                handleRemovePhoto={handleRemovePhoto}
                fileInputRef={fileInputRef}
              />
            )}
          </>
        )}

        {isLoading && (
          <div className="bg-image-overlay absolute z-50 grid h-20 w-20 place-items-center rounded-full md:h-[150px] md:w-[150px]">
            <div className={styles.loader}></div>
          </div>
        )}

        {!user.profile_photo && !isLoading && (
          <div className="bg-image-overlay absolute flex h-20 w-20 items-center justify-center rounded-full md:h-[150px] md:w-[150px]">
            <CameraIcon />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
};
