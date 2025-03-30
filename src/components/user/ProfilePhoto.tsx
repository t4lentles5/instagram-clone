'use client';

import { User } from '@/interfaces/user.interface';

interface Props {
  user: User;
}

export const ProfilePhoto = ({ user }: Props) => {
  return (
    <div className='w-full max-w-[120px] md:max-w-[284px]'>
      <div className='relative flex items-center justify-center w-full cursor-pointer'>
        <img
          src={user.profile_photo}
          alt='profile photo'
          className='object-cover w-20 h-20 md:w-[150px] md:h-[150px] rounded-full border border-separation aspect-square'
        />

        <div className='absolute bg-[#555555b3] w-20 h-20 md:w-[150px] md:h-[150px] flex items-center justify-center rounded-full'>
          <svg
            viewBox='0 0 24 24'
            width='44'
            height='44'
            fill='currentColor'
            className='w-6 h-6 md:w-11 md:h-11'
          >
            <path d='M12 9.652a3.54 3.54 0 1 0 3.54 3.539A3.543 3.543 0 0 0 12 9.65zm6.59-5.187h-.52a1.107 1.107 0 0 1-1.032-.762 3.103 3.103 0 0 0-3.127-1.961H10.09a3.103 3.103 0 0 0-3.127 1.96 1.107 1.107 0 0 1-1.032.763h-.52A4.414 4.414 0 0 0 1 8.874v9.092a4.413 4.413 0 0 0 4.408 4.408h13.184A4.413 4.413 0 0 0 23 17.966V8.874a4.414 4.414 0 0 0-4.41-4.41zM12 18.73a5.54 5.54 0 1 1 5.54-5.54A5.545 5.545 0 0 1 12 18.73z'></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
