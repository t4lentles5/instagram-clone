import { User } from '@/interfaces/user.interface';
import Link from 'next/link';

interface Props {
  user: User;
}

export const SwitchUser = ({ user }: Props) => {
  return (
    <>
      <div className='flex justify-between mb-5 px-4'>
        <div className='flex gap-3'>
          <img
            src={user.profile_photo}
            alt='profile photo'
            className='object-contain border rounded-full w-11 h-11 border-separator'
          />

          <div className='flex flex-col justify-center'>
            <Link
              href={`/${user.username}`}
              className='overflow-hidden text-sm leading-[18px] font-semibold truncate max-w-36'
            >
              {user.username}
            </Link>
            <span className='text-sm leading-[18px] text-foregroundSecondary'>
              {user.fullname}
            </span>
          </div>
        </div>

        <button className='text-xs text-[#0095f6] hover:text-[#dbebf9] hover:font-semibold'>
          Switch
        </button>
      </div>
    </>
  );
};
