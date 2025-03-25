import { User } from '@/interfaces/user.interface';
import Link from 'next/link';

interface Props {
  user: User;
}

export const SwitchUser = ({ user }: Props) => {
  return (
    <>
      <div className='flex justify-between mb-5'>
        <div className='flex gap-3'>
          <img
            src={user.profile_photo}
            alt='profile photo'
            className='object-contain border rounded-full w-11 h-11 border-separator'
          />

          <div className='flex flex-col'>
            <Link href={`/${user.username}`} className='text-sm font-semibold'>
              {user.username}
            </Link>
            <span className='text-sm text-foregroundSecondary'>
              {user.fullname}
            </span>
          </div>
        </div>

        <button className='text-xs text-buttonColor'>Switch</button>
      </div>
    </>
  );
};
