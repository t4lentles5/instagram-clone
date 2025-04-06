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
      <div className="relative flex justify-between px-4 py-2">
        <div className="flex gap-3">
          <Link href={`/${user.username}`}>
            <img
              src={user.profile_photo}
              alt="profile photo"
              className="border-separator h-11 w-11 rounded-full border object-contain"
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

          <div className="flex flex-col justify-center">
            <Link
              href={`/${user.username}`}
              className="max-w-36 truncate overflow-hidden text-sm leading-[18px] font-semibold"
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
            <span className="text-secondary text-xs">Suggested for you</span>
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
              <div className="flex h-full items-center justify-center gap-3">
                <img
                  src={user.profile_photo}
                  alt="profile photo"
                  className="border-separator h-14 w-14 rounded-full border object-contain"
                />
                <div className="flex h-16 w-full flex-col items-start justify-center">
                  <Link
                    href={user.username}
                    className="max-w-36 truncate overflow-hidden text-sm font-bold"
                  >
                    {user.username}
                  </Link>
                  <p className="">{user.fullname}</p>
                </div>
              </div>

              <div className="border-separator grid grid-cols-3 border-b py-4">
                <p className="text-center font-bold">
                  0 <span className="block text-sm font-normal">posts</span>
                </p>
                <p className="text-center font-bold">
                  0 <span className="block text-sm font-normal">followers</span>
                </p>
                <p className="text-center font-bold">
                  0 <span className="block text-sm font-normal">following</span>
                </p>
              </div>

              <div className="border-separator flex h-full w-full flex-col items-center justify-center gap-3 border-b p-4">
                <CameraIcon />

                <p className="text-center text-sm font-bold">
                  No posts yet!
                  <br />
                  <span className="text-sm font-normal">
                    When {user.username} shares something, you&apos;ll see it
                    here.
                  </span>
                </p>
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-[6px] font-semibold text-white">
                <SimilarAccountsIcon />
                <span className="text-sm">Follow</span>
              </button>
            </div>
          )}
        </div>
        <button className="text-blue hover:text-blue-hover text-xs font-semibold">
          Follow
        </button>
      </div>
    </>
  );
};
