import { User } from '@/shared/interfaces/user.interface';

import { getPostsCountByUsername } from '@/actions/post/get-posts-count-by-username';

import { UserProfilePhoto } from './UserProfilePhoto';

import { OptionsIcon } from '@/shared/icons';
import { SimilarAccountsIcon } from '../icons/SimilarAccountsIcon';

interface Props {
  user: User;
  isAuthenticatedUser: boolean;
}

export const UserProfileInfo = async ({ user, isAuthenticatedUser }: Props) => {
  const postsCount = await getPostsCountByUsername(user.username);

  return (
    <>
      <main className='md:border-border mt-4 flex h-full w-full flex-col items-center pb-0 md:mt-0 md:border-b md:pb-10'>
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
                    <button className='bg-button-secondary hover:bg-button-secondary-hover cursor-pointer rounded-lg px-4 py-[6px] text-sm font-semibold'>
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button className='bg-button hover:bg-button-hover cursor-pointer rounded-lg px-5 py-[6px] text-sm font-semibold text-white'>
                        Follow
                      </button>

                      <button className='bg-button-secondary hover:bg-button-secondary-hover cursor-pointer rounded-lg px-4 py-[6px] text-sm font-semibold'>
                        Message
                      </button>

                      <button className='bg-button-secondary hover:bg-button-secondary-hover cursor-pointer rounded-lg p-2'>
                        <SimilarAccountsIcon />
                      </button>
                    </>
                  )}
                </div>

                <button className='cursor-pointer'>
                  <OptionsIcon isAuthenticatedUser={isAuthenticatedUser} />
                </button>
              </div>
            </div>

            <div className='flex w-full items-center justify-between pr-10 sm:justify-start sm:gap-10 sm:pr-0'>
              <button className='px-2 font-bold'>
                {postsCount}{' '}
                <span className='text-secondary font-normal'>posts</span>
              </button>
              <button className='px-2 font-bold'>
                0 <span className='text-secondary font-normal'>followers</span>
              </button>
              <button className='px-2 font-bold'>
                0 <span className='text-secondary font-normal'>following</span>
              </button>
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
            <button className='bg-button-secondary hover:bg-button-secondary-hover w-full cursor-pointer rounded-lg py-[6px] text-sm font-semibold'>
              Edit Profile
            </button>
          ) : (
            <>
              <button className='bg-button hover:bg-button-hover w-full cursor-pointer rounded-lg py-[6px] text-sm font-semibold text-white'>
                Follow
              </button>

              <button className='bg-button-secondary hover:bg-button-secondary-hover w-full cursor-pointer rounded-lg py-[6px] text-sm font-semibold'>
                Message
              </button>

              <button className='bg-button-secondary hover:bg-button-secondary-hover cursor-pointer rounded-lg p-2'>
                <SimilarAccountsIcon />
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
};
