'use client';

import { User } from '@/interfaces/user.interface';

interface Props {
  user: User;
}

export const ProfilePhoto = ({ user }: Props) => {
  return (
    <div className='w-full max-w-[120px] md:max-w-[284px]'>
      <div className='flex items-center justify-center w-full cursor-pointer'>
        <img
          src={user.profile_photo}
          alt='profile photo'
          className='object-cover w-20 h-20 md:w-[150px] md:h-[150px] rounded-full border border-separation aspect-square'
        />
      </div>
    </div>
  );
};
