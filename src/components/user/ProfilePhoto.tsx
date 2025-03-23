'use client';

import { User } from '@/interfaces/user.interface';

interface Props {
  user: User;
}

export const ProfilePhoto = ({ user }: Props) => {
  return (
    <div className='w-[150px] sm:w-[284px] '>
      <div className='sm:w-[284px] flex items-center justify-center cursor-pointer'>
        <img
          src={
            !user.profile_photo ? '/default_photo.jpg' : `${user.profile_photo}`
          }
          alt='profile photo'
          className='object-contain w-20 h-20 border rounded-full sm:w-[150px] sm:h-[150px] border-separation'
        />
      </div>
    </div>
  );
};
