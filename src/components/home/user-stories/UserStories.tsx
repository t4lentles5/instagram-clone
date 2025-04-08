import Link from 'next/link';
import { ProfilePhoto } from '@/components/profile/ProfilePhoto';
import { User } from '@/interfaces/user.interface';

interface Props {
  usersStories: User[];
  user: User;
}

export const UserStories = ({ usersStories, user }: Props) => {
  return (
    <>
      <div className="mb-6 flex w-full gap-[10px] py-2">
        <Link
          href={`/stories/${user.username}`}
          key={user.id}
          className="flex flex-col items-center justify-center"
        >
          <div className="px-1 pb-1">
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

          <span className="text-primary max-w-14 truncate overflow-hidden text-xs">
            {user.username}
          </span>
        </Link>

        {usersStories.map((user) => (
          <Link
            href={`/stories/${user.username}`}
            key={user.id}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative px-1 pb-1">
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

            <span className="text-primary max-w-14 truncate overflow-hidden text-xs">
              {user.username}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};
