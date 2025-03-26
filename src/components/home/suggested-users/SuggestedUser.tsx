'use client';

import { User } from '@/interfaces/user.interface';
import Link from 'next/link';
import { UserPlus } from 'phosphor-react';
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
              className='overflow-hidden text-sm font-semibold truncate max-w-36'
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
                  <Link href={user.username} className='font-bold '>
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
                <svg
                  aria-label='Camera'
                  fill='currentColor'
                  height='50'
                  role='img'
                  viewBox='0 0 96 96'
                  width='50'
                  className='text-foregroundSecondary'
                >
                  <title>Camera</title>
                  <circle
                    cx='48'
                    cy='48'
                    fill='none'
                    r='47'
                    stroke='currentColor'
                    strokeMiterlimit='10'
                    strokeWidth='2'
                  ></circle>
                  <ellipse
                    cx='48.002'
                    cy='49.524'
                    fill='none'
                    rx='10.444'
                    ry='10.476'
                    stroke='currentColor'
                    strokeLinejoin='round'
                    strokeWidth='2.095'
                  ></ellipse>
                  <path
                    d='M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z'
                    fill='none'
                    stroke='currentColor'
                    strokeLinejoin='round'
                    strokeWidth='2'
                  ></path>
                </svg>

                <p className='text-sm font-bold text-center text-text'>
                  No posts yet!
                  <br />
                  <span className='text-sm font-normal text-foregroundSecondary'>
                    When {user.username} shares something, you&apos;ll see it
                    here.
                  </span>
                </p>
              </div>

              <button className='flex justify-center w-full gap-2 mt-4 button-primary'>
                <UserPlus size={24} weight='bold' />
                <span className='text-sm'>Follow</span>
              </button>
            </div>
          )}
        </div>
        <button className='text-xs text-buttonPrimary'>Follow</button>
      </div>
    </>
  );
};
