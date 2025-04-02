import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { getRecommendedUsers } from '@/actions/user/get-recommended-users';
import { SwitchUser } from '@/components/home/SwitchUser';
import { Footer } from '@/components/ui/Footer';
import { SuggestedUsers } from '@/components/home/suggested-users/SuggestedUsers';
import { UserStories } from '@/components/home/user-stories/UserStories';

export default async function HomePage() {
  const user = await getAuthenticatedUser();
  const users = await getRecommendedUsers(user.id);

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='w-[630px] pt-4 flex flex-col items-center'>
        <UserStories users={users} />
        {users.map((user) => (
          <div
            key={user.id}
            className='w-full max-w-[470px] mx-auto px-4 sm:px-0'
          >
            <div className='flex items-center w-full pb-[14px] pl-1'>
              <div className='mr-3'>
                <div className='w-8 h-8'>
                  <img
                    className='w-8 h-8 rounded-full'
                    src={user.profile_photo}
                    alt='profile photo'
                  />
                </div>
              </div>
              <div className='flex items-baseline w-full gap-x-1'>
                <span className='text-sm leading-[18px]'>{user.username}</span>

                <span className='flex items-center justify-center'>•</span>

                <time
                  dateTime='2025-03-31T15:30:23.000Z'
                  className='text-sm leading-[18px] text-[#a8a8a8]'
                  title='Mar 31, 2025'
                >
                  1d
                </time>
              </div>

              <div className='flex justify-end w-8'>
                <svg
                  aria-label='More options'
                  fill='currentColor'
                  height='24'
                  role='img'
                  viewBox='0 0 24 24'
                  width='24'
                >
                  <title>More options</title>
                  <circle cx='12' cy='12' r='1.5'></circle>
                  <circle cx='6' cy='12' r='1.5'></circle>
                  <circle cx='18' cy='12' r='1.5'></circle>
                </svg>
              </div>
            </div>

            <div className='min-[485px]:border w-full min-[485px]:rounded-[4px] min-[485px]:border-[#262626] aspect-[468/585]'></div>
          </div>
        ))}
      </div>

      <div className='hidden w-[320px] ml-16 pt-9 min-[1160px]:flex h-full flex-col justify-start'>
        <SwitchUser user={user} />

        <SuggestedUsers users={users} />

        <Footer />
      </div>
    </div>
  );
}
