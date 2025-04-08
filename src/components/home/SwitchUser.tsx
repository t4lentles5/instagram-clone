import Link from 'next/link';
import { User } from '@/interfaces/user.interface';
import { ProfilePhoto } from '@/components/profile/ProfilePhoto';

interface Props {
  user: User;
}

export const SwitchUser = ({ user }: Props) => {
  return (
    <>
      <div className="mb-5 flex justify-between px-4">
        <div className="flex gap-3">
          <ProfilePhoto
            profile_photo={user.profile_photo}
            imageSize={{
              size: 'w-[44px]',
            }}
            backgroundDivSize={{
              size: 'w-[48px]',
            }}
            borderDivSize={{
              size: 'w-[52px]',
            }}
          />

          <div className="flex flex-col justify-center">
            <Link
              href={`/${user.username}`}
              className="max-w-36 truncate overflow-hidden text-sm leading-[18px] font-semibold"
            >
              {user.username}
            </Link>
            <span className="text-secondary text-sm leading-[18px]">
              {user.fullname}
            </span>
          </div>
        </div>

        <button className="text-blue hover:text-blue-hover text-xs font-semibold">
          Switch
        </button>
      </div>
    </>
  );
};
