'use client';

import { User } from '@/interfaces/user.interface';
import { ProfilePhoto } from './ProfilePhoto';
import Link from 'next/link';
import { OptionsIcon } from '@/assets/icons/OptionsIcon';
import { SimilarAccountsIcon } from '@/assets/icons/SimilarAccountsIcon';

interface Props {
  userByUsername: User;
  authenticatedUser: User;
}

export const UserInfo = ({ userByUsername, authenticatedUser }: Props) => {
  const isOwnProfile = userByUsername.username === authenticatedUser.username;
  const user = isOwnProfile ? authenticatedUser : userByUsername;

  return (
    <>
      <main className='flex flex-col items-center w-full h-full pb-0 mt-4 border-b md:pb-10 md:mt-0 border-separator'>
        <div className='flex w-full'>
          <ProfilePhoto user={user} />

          <div className='flex flex-col w-full h-full gap-3 ml-5 md:gap-5'>
            <div className='flex items-center justify-start w-full'>
              <h2 className='pr-5 overflow-hidden text-lg truncate max-w-48'>
                {user.username}
              </h2>

              {isOwnProfile ? (
                <div className='flex items-center justify-center gap-2'>
                  <Link href={''} className='button-secondary'>
                    Edit Profile
                  </Link>

                  <button>
                    <OptionsIcon isOwnProfile={isOwnProfile} />
                  </button>
                </div>
              ) : (
                <>
                  <div className='hidden gap-2 md:flex'>
                    <button className='text-sm button-primary'>Follow</button>

                    <button className='text-sm button-secondary'>
                      Message
                    </button>

                    <button className='px-2 font-semibold rounded-lg text-foreground bg-buttonSecondary hover:bg-buttonSecondaryHover'>
                      <SimilarAccountsIcon />
                    </button>
                  </div>

                  <OptionsIcon isOwnProfile={isOwnProfile} />
                </>
              )}
            </div>
            <div className='flex gap-2 md:hidden'>
              <button className='text-sm button-primary'>Follow</button>

              <button className='text-sm button-secondary'>Message</button>

              <button className='px-2 font-semibold rounded-lg text-foreground bg-buttonSecondary hover:bg-buttonSecondaryHover'>
                <SimilarAccountsIcon />
              </button>
            </div>

            <div className='items-center justify-start hidden w-full md:flex md:gap-10'>
              <p className='font-bold text-center'>
                0{' '}
                <span className='font-normal text-foregroundSecondary'>
                  posts
                </span>
              </p>
              <button className='px-2 font-bold text-text'>
                0{' '}
                <span className='font-normal text-foregroundSecondary'>
                  followers
                </span>
              </button>
              <button className='px-2 font-bold text-text'>
                0{' '}
                <span className='font-normal text-foregroundSecondary'>
                  following
                </span>
              </button>
            </div>
            <div className='hidden md:block'>
              <h3 className='text-sm font-semibold'>{user.fullname}</h3>
              <span className='text-sm'>💙</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-start w-full p-4 md:hidden'>
          <h3 className='text-sm font-semibold'>{user.fullname}</h3>
          <span className='text-sm'>💙</span>
        </div>
      </main>
    </>
  );
};
