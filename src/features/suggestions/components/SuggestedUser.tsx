'use client';

import { useState } from 'react';
import Link from 'next/link';

import { RecommendedUser } from '@/features/suggestions/interfaces/recommended-user.interface';

import { SimilarAccountsIcon } from '@/features/profile/icons/SimilarAccountsIcon';

import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { CameraCircleIcon } from '@/features/posts/icons';
import { follow } from '../actions/follow';

interface Props {
  user: RecommendedUser;
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
              setIsHovered(false);
              setIsProfilePhotoHovered(false);
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
                setIsHovered(false);
                setIsUsernameHovered(false);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setIsUsernameHovered(false);
              }}
            >
              {user.username}
            </Link>
            <span className='text-ig-secondary-text text-xs'>
              Suggested for you
            </span>
          </div>

          {isHovered && (
            <div
              className={`${isUsernameHovered && 'top-4 -right-130'} ${
                isProfilePhotoHovered && 'top-10 -right-[80px]'
              } shadow-foregroundSecondary bg-background absolute z-10 w-[365px] rounded-lg p-4 shadow-sm`}
              onMouseEnter={() => {
                setIsHovered(false);
                if (isUsernameHovered) {
                  setIsUsernameHovered(false);
                } else {
                  setIsProfilePhotoHovered(false);
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

              <button className='text-web-always-white mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-[6px] font-semibold'>
                <SimilarAccountsIcon />
                <span className='text-sm'>Follow</span>
              </button>
            </div>
          )}
        </div>
        <button
          className='text-ig-primary-button hover:text-ig-link active:text-ig-primary-button-pressed cursor-pointer text-xs font-semibold'
          onClick={async () => {
            await follow(user.id);
          }}
        >
          Follow
        </button>
      </div>
    </>
  );
};
