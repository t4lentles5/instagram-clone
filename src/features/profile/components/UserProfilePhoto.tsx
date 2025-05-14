'use client';

import { useUserStore } from '@/core/store/user/user-store';

import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { PhotoOptionsModal } from '@/features/profile/components/PhotoOptionsModal';

import { User } from '@/core/shared/interfaces/user.interface';
import { useProfilePhoto } from '@/features/profile/hooks/useProfilePhoto';

import { CameraIcon } from '@/features/profile/icons/CameraIcon';
import styles from '@/features/profile/components/image-loader.module.css';

interface Props {
  user: User;
}

export const UserProfilePhoto = ({ user }: Props) => {
  const { authenticatedUser } = useUserStore();
  const {
    fileInputRef,
    dialogRef,
    isOpen,
    setIsOpen,
    isLoading,
    handleUpload,
    handleRemovePhoto,
  } = useProfilePhoto(user);

  const isOwner = user.id === authenticatedUser.id;

  return (
    <div className='w-full max-w-[120px] md:max-w-[284px]'>
      <div
        className='relative flex w-full cursor-pointer items-center justify-center rounded-full'
        onClick={() => {
          if (!user.profile_photo && isOwner) {
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

        {user.profile_photo && isOwner && !isLoading && (
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
                dialogRef={dialogRef}
                onClose={() => setIsOpen(false)}
                handleRemovePhoto={handleRemovePhoto}
                fileInputRef={fileInputRef}
              />
            )}
          </>
        )}

        {isLoading && (
          <div className='bg-ig-profile-image-overlay absolute z-50 grid h-20 w-20 place-items-center rounded-full md:h-[150px] md:w-[150px]'>
            <div className={styles.loader}></div>
          </div>
        )}

        {!user.profile_photo && isOwner && !isLoading && (
          <div className='bg-ig-profile-image-overlay absolute flex h-20 w-20 items-center justify-center rounded-full md:h-[150px] md:w-[150px]'>
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
