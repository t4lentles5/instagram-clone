'use client';

import { useState } from 'react';
import Link from 'next/link';

import { User } from '@/shared/interfaces/user.interface';

import { SimilarAccountsIcon } from '@/profile/icons/SimilarAccountsIcon';

import { ProfilePhoto } from '@/shared/components/ProfilePhoto';
import { CameraCircleIcon } from '@/posts/icons';

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
          <Link
            href={`/${user.username}`}
            onMouseEnter={() => {
              setIsHovered(true);
              setIsProfilePhotoHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsProfilePhotoHovered(false);
            }}
          >
            <ProfilePhoto
              profile_photo={user.profile_photo}
              imageSize={{
                size: 'w-11',
              }}
              backgroundDivSize={{
                size: 'w-[48px]',
              }}
              borderDivSize={{
                size: 'w-[52px]',
              }}
            />
          </Link>

          <div className='flex flex-col justify-center'>
            <Link
              href={`/${user.username}`}
              className='max-w-36 truncate overflow-hidden text-sm leading-[18px] font-semibold'
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
            <span className='text-secondary text-xs'>Suggested for you</span>
          </div>

          {isHovered && (
            <div
              className={`${isUsernameHovered && 'top-4 -right-130'} ${
                isProfilePhotoHovered && 'top-10 -right-[80px]'
              } shadow-foregroundSecondary bg-background absolute z-10 w-[365px] rounded-lg p-4 shadow-sm`}
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
              <div className='flex items-center justify-center gap-3'>
                <div className='w-[70px]'>
                  <ProfilePhoto
                    profile_photo={user.profile_photo}
                    imageSize={{
                      size: 'w-14',
                    }}
                    backgroundDivSize={{
                      size: 'w-[60px]',
                    }}
                    borderDivSize={{
                      size: 'w-[64px]',
                    }}
                  />
                </div>
                <div className='flex w-full flex-col items-start justify-center'>
                  <Link
                    href={user.username}
                    className='max-w-36 truncate overflow-hidden text-sm font-bold'
                  >
                    {user.username}
                  </Link>
                  <p className='text-secondary max-w-36 truncate overflow-hidden text-sm'>
                    {user.fullname}
                  </p>
                </div>
              </div>

              <div className='border-separator grid grid-cols-3 border-b py-4'>
                <p className='text-center font-bold'>
                  0 <span className='block text-sm font-normal'>posts</span>
                </p>
                <p className='text-center font-bold'>
                  0 <span className='block text-sm font-normal'>followers</span>
                </p>
                <p className='text-center font-bold'>
                  0 <span className='block text-sm font-normal'>following</span>
                </p>
              </div>

              <div className='border-separator flex h-full w-full flex-col items-center justify-center gap-3 border-b p-4'>
                <CameraCircleIcon />

                <p className='text-center text-sm font-bold'>
                  No posts yet!
                  <br />
                  <span className='text-sm font-normal'>
                    When {user.username} shares something, you&apos;ll see it
                    here.
                  </span>
                </p>
              </div>

              <button className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-[6px] font-semibold text-white'>
                <SimilarAccountsIcon />
                <span className='text-sm'>Follow</span>
              </button>
            </div>
          )}
        </div>
        <button className='text-blue hover:text-blue-hover text-xs font-semibold'>
          Follow
        </button>
      </div>
    </>
  );
};
