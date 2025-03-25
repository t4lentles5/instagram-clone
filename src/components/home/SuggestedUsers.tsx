import { User } from '@/interfaces/user.interface';
import Link from 'next/link';

interface Props {
  users: User[];
}

export const SuggestedUsers = ({ users }: Props) => {
  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <span className='text-sm font-semibold text-foregroundSecondary'>
          Suggested for you
        </span>
        <Link href={'/explore/people'} className='text-xs font-semibold'>
          See All
        </Link>
      </div>

      <div className='flex flex-col gap-4'>
        {users.map((user) => (
          <div key={user.id} className='flex justify-between'>
            <div className='flex gap-3'>
              <img
                src={user.profile_photo}
                alt='profile photo'
                className='object-contain border rounded-full cursor-pointer w-11 h-11 border-separator'
              />

              <div className='flex flex-col'>
                <Link
                  href={`/${user.username}`}
                  className='text-sm font-semibold'
                >
                  {user.username}
                </Link>
                <span className='text-xs text-foregroundSecondary'>
                  Suggested for you
                </span>
              </div>
            </div>

            <button className='text-xs text-buttonColor'>Follow</button>
          </div>
        ))}
      </div>
    </>
  );
};
