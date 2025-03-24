'use client';

import { User } from '@/interfaces/user.interface';

interface Props {
  user: User;
}

export const ProfilePhoto = ({ user }: Props) => {
  return (
    <div className='w-[150px] md:w-[284px] '>
      <div className='md:w-[284px] flex items-center justify-center cursor-pointer'>
        <img
          src={
            !user.profile_photo ? '/default_photo.jpg' : `${user.profile_photo}`
          }
          alt='profile photo'
          className='object-contain w-20 h-20 border rounded-full md:w-[150px] md:h-[150px] border-separation'
        />
      </div>
    </div>
  );
};
