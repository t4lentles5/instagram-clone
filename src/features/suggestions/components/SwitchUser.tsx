import Link from 'next/link';

import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { AuthenticatedUser } from '@/features/auth/interfaces/authenticated-user.interface';

interface Props {
  user: AuthenticatedUser;
}

export const SwitchUser = ({ user }: Props) => {
  return (
    <>
      <div className='mb-5 flex justify-between px-4'>
        <div className='flex gap-3'>
          <Link href={`/${user.username}`}>
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
          </Link>
          <div className='flex flex-col justify-center'>
            <Link
              href={`/${user.username}`}
              className='max-w-36 truncate overflow-hidden text-sm leading-[18px] font-semibold'
            >
              {user.username}
            </Link>
            <span className='text-ig-secondary-text text-sm leading-[18px]'>
              {user.fullname}
            </span>
          </div>
        </div>

        <button className='text-ig-primary-button hover:text-ig-link active:text-ig-primary-button-pressed cursor-pointer text-xs font-semibold'>
          Switch
        </button>
      </div>
    </>
  );
};
