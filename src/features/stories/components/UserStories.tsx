import Link from 'next/link';

import { Story } from '../interfaces/story.interface';

import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { AuthenticatedUser } from '@/features/auth/interfaces/authenticated-user.interface';

interface Props {
  stories: Story[];
  user: AuthenticatedUser;
}

export const UserStories = ({ stories, user }: Props) => {
  console.log(stories);

  return (
    <>
      <div className='mb-6 flex w-full gap-[10px] py-2'>
        <Link
          href={`/stories/${user.username}`}
          key={user.id}
          className='flex flex-col items-center justify-center'
        >
          <div className='px-1 pb-1'>
            {/* <div> */}

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
            {/* </div> */}
          </div>

          <span className='text-primary max-w-14 truncate overflow-hidden text-xs'>
            {user.username}
          </span>
        </Link>

        {stories &&
          stories.map((story) => (
            <Link
              href={`/stories/${story.following.username}`}
              key={story.id}
              className='flex flex-col items-center justify-center'
            >
              <div className='relative px-1 pb-1'>
                <ProfilePhoto
                  profile_photo={story.following.profile_photo}
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

              <span className='text-primary max-w-14 truncate overflow-hidden text-xs'>
                {story.following.username}
              </span>
            </Link>
          ))}
      </div>
    </>
  );
};
