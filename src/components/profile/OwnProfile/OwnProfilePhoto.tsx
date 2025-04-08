'use client';

import { useRef } from 'react';
import { User } from '@/interfaces/user.interface';
import { ProfilePhoto } from '@/components/profile/ProfilePhoto';

interface Props {
  user: User;
}

export const OwnProfilePhoto = ({ user }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = user.username;
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('username', username);

    const res = await fetch('/api/upload-profile-photo', {
      method: 'POST',
      body: formData,
    });

    await res.json();
  };

  return (
    <div className="w-full max-w-[120px] md:max-w-[284px]">
      <div
        className="relative flex w-full cursor-pointer items-center justify-center"
        onClick={() => fileInputRef.current?.click()}
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

        {/* <div className="bg-image-overlay absolute flex h-20 w-20 items-center justify-center rounded-full md:h-[150px] md:w-[150px]">
          <svg
            viewBox="0 0 24 24"
            width="44"
            height="44"
            fill="currentColor"
            className="h-6 w-6 text-white md:h-11 md:w-11"
          >
            <path d="M12 9.652a3.54 3.54 0 1 0 3.54 3.539A3.543 3.543 0 0 0 12 9.65zm6.59-5.187h-.52a1.107 1.107 0 0 1-1.032-.762 3.103 3.103 0 0 0-3.127-1.961H10.09a3.103 3.103 0 0 0-3.127 1.96 1.107 1.107 0 0 1-1.032.763h-.52A4.414 4.414 0 0 0 1 8.874v9.092a4.413 4.413 0 0 0 4.408 4.408h13.184A4.413 4.413 0 0 0 23 17.966V8.874a4.414 4.414 0 0 0-4.41-4.41zM12 18.73a5.54 5.54 0 1 1 5.54-5.54A5.545 5.545 0 0 1 12 18.73z"></path>
          </svg>
        </div> */}
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
