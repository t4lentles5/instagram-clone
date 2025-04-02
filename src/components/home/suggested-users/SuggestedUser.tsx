'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CameraIcon } from '@/assets/icons/CameraIcon';
import { SimilarAccountsIcon } from '@/assets/icons/SimilarAccountsIcon';
import { User } from '@/interfaces/user.interface';

interface Props {
  user: User;
}

export const SuggestedUser = ({ user }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUsernameHovered, setIsUsernameHovered] = useState(false);
  const [isProfilePhotoHovered, setIsProfilePhotoHovered] = useState(false);

  return (
    <>
      <div className='relative flex justify-between px-4 py-2'>
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

          <div className='flex flex-col justify-center'>
            <Link
              href={`/${user.username}`}
              className='overflow-hidden text-sm leading-[18px] font-semibold truncate max-w-36'
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
              className={`${isUsernameHovered && '-right-[130] top-4'} ${
                isProfilePhotoHovered && '-right-[80px] top-10'
              } absolute shadow-foregroundSecondary z-10 w-[365px] p-4 rounded-lg shadow-sm bg-background`}
              onMouseEnter={() => {
                setIsHovered(true);
                if (isUsernameHovered) {
                  setIsUsernameHovered(true);
                } else {
                  setIsProfilePhotoHovered(true);
                }
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                if (isUsernameHovered) {
                  setIsUsernameHovered(false);
                } else {
                  setIsProfilePhotoHovered(false);
                }
              }}
            >
              <div className='flex items-center justify-center h-full gap-3'>
                <img
                  src={user.profile_photo}
                  alt='profile photo'
                  className='object-contain border rounded-full w-14 h-14 border-separator'
                />
                <div className='flex flex-col items-start justify-center w-full h-16'>
                  <Link
                    href={user.username}
                    className='overflow-hidden text-sm font-bold truncate max-w-36'
                  >
                    {user.username}
                  </Link>
                  <p className='text-foregroundSecondary'>{user.fullname}</p>
                </div>
              </div>

              <div className='grid grid-cols-3 py-4 border-b border-separator'>
                <p className='font-bold text-center text-text'>
                  0 <span className='block text-sm font-normal'>posts</span>
                </p>
                <p className='font-bold text-center text-text'>
                  0 <span className='block text-sm font-normal'>followers</span>
                </p>
                <p className='font-bold text-center text-text'>
                  0 <span className='block text-sm font-normal'>following</span>
                </p>
              </div>

              <div className='flex flex-col items-center justify-center w-full h-full gap-3 p-4 border-b border-separator'>
                <CameraIcon />

                <p className='text-sm font-bold text-center text-text'>
                  No posts yet!
                  <br />
                  <span className='text-sm font-normal text-foregroundSecondary'>
                    When {user.username} shares something, you&apos;ll see it
                    here.
                  </span>
                </p>
              </div>

              <button className='flex items-center justify-center w-full gap-2 mt-4 button-primary'>
                <SimilarAccountsIcon />
                <span className='text-sm'>Follow</span>
              </button>
            </div>
          )}
        </div>
        <button className='text-xs text-[#0095f6] hover:text-[#dbebf9] hover:font-semibold'>
          Follow
        </button>
      </div>
    </>
  );
};
