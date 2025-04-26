import { User } from '@/interfaces/user.interface';
import { UserProfilePhoto } from '@/features/profile/components/UserProfilePhoto';

import { getPostsCountByUsername } from '@/actions/post/get-posts-count-by-username';

import { SimilarAccountsIcon } from '@/features/profile/icons/SimilarAccountsIcon';
import { OptionsIcon } from '@/components/icons/OptionsIcon';

interface Props {
  user: User;
  isAuthenticatedUser: boolean;
}

export const UserProfileInfo = async ({ user, isAuthenticatedUser }: Props) => {
  const postsCount = await getPostsCountByUsername(user.username);

  return (
    <>
      <main className='border-border mt-4 flex h-full w-full flex-col items-center border-b pb-0 md:mt-0 md:pb-10'>
        <div className='flex w-full'>
          <UserProfilePhoto user={user} />

          <div className='ml-5 flex h-full w-full flex-col gap-3 md:gap-5'>
            <div className='flex w-full items-center justify-start'>
              <h2 className='max-w-48 truncate overflow-hidden pr-5 text-lg'>
                {user.username}
              </h2>

              <div className='flex items-center justify-center gap-2'>
                {isAuthenticatedUser ? (
                  <button className='bg-button-secondary hover:bg-button-secondary-hover cursor-pointer rounded-lg px-4 py-[6px] text-sm font-semibold'>
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button className='bg-button hover:bg-button-hover cursor-pointer rounded-lg px-5 py-[6px] text-sm font-semibold'>
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

                <button className='cursor-pointer'>
                  <OptionsIcon isAuthenticatedUser={isAuthenticatedUser} />
                </button>
              </div>
            </div>
            <div className='flex gap-2 md:hidden'>
              <button className='rounded-lg px-4 py-[6px] text-sm font-semibold text-white'>
                Follow
              </button>

              <button className='text-primary rounded-lg px-4 py-[6px] text-sm font-semibold'>
                Message
              </button>

              <button className='text-primary rounded-lg px-2 font-semibold'>
                <SimilarAccountsIcon />
              </button>
            </div>

            <div className='hidden w-full items-center justify-start md:flex md:gap-10'>
              <p className='text-center font-bold'>
                {postsCount}{' '}
                <span className='text-secondary font-normal'>posts</span>
              </p>
              <button className='px-2 font-bold'>
                0 <span className='text-secondary font-normal'>followers</span>
              </button>
              <button className='px-2 font-bold'>
                0 <span className='text-secondary font-normal'>following</span>
              </button>
            </div>
            <div className='hidden md:block'>
              <h3 className='text-sm font-semibold'>{user.fullname}</h3>
              <span className='text-sm'>{user.bio}</span>
            </div>
          </div>
        </div>

        <div className='flex w-full flex-col justify-start p-4 md:hidden'>
          <h3 className='text-sm font-semibold'>{user.fullname}</h3>
          <span className='text-sm'>💜</span>
        </div>
      </main>
    </>
  );
};
