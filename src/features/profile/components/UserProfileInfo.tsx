'use client';

import { User } from '@/core/shared/interfaces/user.interface';

import { UserProfilePhoto } from '@/features/profile/components/UserProfilePhoto';

import { OptionsIcon } from '@/core/shared/icons';
import { SimilarAccountsIcon } from '@/features/profile/icons/SimilarAccountsIcon';
import { Followers } from './Followers';
import { FollowUnfollowButton } from '@/core/shared/components/FollowUnfollowButton';
import { Following } from './Following';
interface Props {
  user: User;
  isAuthenticatedUser: boolean;
}

export const UserProfileInfo = ({ user, isAuthenticatedUser }: Props) => {
  return (
    <>
      <main className='md:border-ig-separator mt-4 flex h-full w-full flex-col items-center pb-0 md:mt-0 md:border-b md:pb-10'>
        <div className='flex w-full'>
          <UserProfilePhoto user={user} />

          <div className='ml-5 flex h-full w-full flex-col gap-3 md:gap-5'>
            <div className='flex w-full items-center justify-start'>
              <h2 className='max-w-48 truncate overflow-hidden pr-5 text-lg'>
                {user.username}
              </h2>

              <div className='flex items-center justify-center gap-2'>
                <div className='hidden items-center justify-center gap-2 md:flex'>
                  {isAuthenticatedUser ? (
                    <button className='bg-ig-secondary-button-background hover:bg-ig-secondary-button-background-hover active:bg-ig-secondary-button-background-pressed cursor-pointer rounded-lg px-4 py-[6px] text-sm font-semibold transition-colors duration-200'>
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <FollowUnfollowButton userId={user.id} />

                      <button className='bg-ig-secondary-button-background hover:bg-ig-secondary-button-background-hover active:bg-ig-secondary-button-background-pressed cursor-pointer rounded-lg px-4 py-[6px] text-sm font-semibold transition-colors duration-200'>
                        Message
                      </button>

                      <button className='bg-ig-secondary-button-background hover:bg-ig-secondary-button-background-hover active:bg-ig-secondary-button-background-pressed cursor-pointer rounded-lg p-2 transition-colors duration-200'>
                        <SimilarAccountsIcon />
                      </button>
                    </>
                  )}
                </div>

                <button className='active:text-ig-primary-text-pressed cursor-pointer'>
                  <OptionsIcon isAuthenticatedUser={isAuthenticatedUser} />
                </button>
              </div>
            </div>

            <div className='flex w-full items-center justify-between pr-10 sm:justify-start sm:gap-10 sm:pr-0'>
              <button className='px-2 font-bold'>
                {user._count.posts}{' '}
                <span className='text-ig-secondary-text font-normal'>
                  posts
                </span>
              </button>

              <Followers
                username={user.username}
                followersQuantity={user._count.followers}
              />

              <Following
                username={user.username}
                followingQuantity={user._count.following}
              />
            </div>
            <div className='hidden md:block'>
              <h3 className='max-w-36 truncate overflow-hidden text-sm font-semibold'>
                {user.fullname}
              </h3>
              <span className='text-sm'>{user.bio}</span>
            </div>
          </div>
        </div>

        <div className='flex w-full flex-col justify-start p-4 md:hidden'>
          <h3 className='max-w-36 truncate overflow-hidden text-sm font-semibold'>
            {user.fullname}
          </h3>
          <span className='text-sm'>💜</span>
        </div>

        <div className='flex w-full items-center justify-evenly gap-2 p-4 pt-0 md:hidden'>
          {isAuthenticatedUser ? (
            <button className='bg-ig-secondary-button-background hover:bg-ig-secondary-button-background-hover active:bg-ig-secondary-button-background-pressed w-full cursor-pointer rounded-lg py-[6px] text-sm font-semibold transition-colors duration-200'>
              Edit Profile
            </button>
          ) : (
            <>
              <FollowUnfollowButton userId={user.id} />

              <button className='bg-ig-secondary-button-background hover:bg-ig-secondary-button-background-hover active:bg-ig-secondary-button-background-pressed w-full cursor-pointer rounded-lg py-[6px] text-sm font-semibold transition-colors duration-200'>
                Message
              </button>

              <button className='bg-ig-secondary-button-background hover:bg-ig-secondary-button-background-hover active:bg-ig-secondary-button-background-pressed cursor-pointer rounded-lg p-2 transition-colors duration-200'>
                <SimilarAccountsIcon />
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
};
