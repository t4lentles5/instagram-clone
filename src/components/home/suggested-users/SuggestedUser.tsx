'use client';

import { User } from '@/interfaces/user.interface';
import Link from 'next/link';
import { CameraSlash } from 'phosphor-react';
import { useState } from 'react';

interface Props {
  user: User;
}

export const SuggestedUser = ({ user }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUsernameHovered, setIsUsernameHovered] = useState(false);
  const [isProfilePhotoHovered, setIsProfilePhotoHovered] = useState(false);

  return (
    <>
      <div className='relative flex justify-between'>
        <div className='flex gap-3'>
          <Link href={`/${user.username}`}>
            <img
              src={user.profile_photo}
              alt='profile photo'
              className='object-contain border rounded-full w-11 h-11 border-separator'
              onMouseEnter={() => {
                setIsHovered(true);
                setIsProfilePhotoHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setIsProfilePhotoHovered(false);
              }}
            />
          </Link>

          <div className='flex flex-col'>
            <Link
              href={`/${user.username}`}
              className='text-sm font-semibold'
              onMouseEnter={() => {
                setIsHovered(true);
                setIsUsernameHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setIsUsernameHovered(false);
              }}
            >
              {user.username}
            </Link>
            <span className='text-xs text-foregroundSecondary'>
              Suggested for you
            </span>
          </div>

          {isHovered && (
            <div
              className={`${isUsernameHovered && '-right-[130] top-5'} ${
                isProfilePhotoHovered && '-right-[80px] top-12'
              } absolute shadow-foregroundSecondary z-10 w-[365px] p-4 rounded-lg shadow-sm bg-background`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className='flex items-center justify-center h-full gap-3'>
                <img
                  src={user.profile_photo}
                  alt='profile photo'
                  className='object-contain w-16 h-16 border rounded-full border-separation'
                />
                <div className='flex flex-col items-start justify-center w-full h-16'>
                  <p className='text-sm font-bold'>{user.username}</p>
                  <p className='text-xs text-gray-500'>{user.fullname}</p>
                </div>
              </div>

              <div className='flex items-center w-full gap-3 p-3 text-xs border-b justify-evenly border-separation'>
                <p className='text-center text-text'>0 posts</p>
                <button className='px-2 py-1 font-bold rounded-lg text-text '>
                  0 Followers
                </button>
                <button className='px-2 py-1 font-bold rounded-lg text-text '>
                  0 Following
                </button>
              </div>

              <div className='flex flex-col items-center justify-center w-full h-full gap-3 p-3'>
                <CameraSlash
                  size={64}
                  strokeWidth={1.5}
                  className='text-gray-500'
                />
                <p className='text-sm font-bold text-center text-text'>
                  No posts yet!
                  <br />
                  <span className='font-normal'>
                    When {user.fullname} shares something, you&apos;ll see it
                    here.
                  </span>
                </p>
              </div>
              <button className='w-full px-2 py-2 text-xs font-bold text-white rounded-lg bg-primary'>
                Follow
              </button>
            </div>
          )}
        </div>
        <button className='text-xs text-buttonColor'>Follow</button>
      </div>
    </>
  );
};
