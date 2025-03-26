import { User } from '@/interfaces/user.interface';
import Link from 'next/link';

interface Props {
  users: User[];
}

export const UserStories = ({ users }: Props) => {
  return (
    <>
      <div className='flex w-full gap-4'>
        {users.map((user) => (
          <Link
            href={`/stories/${user.username}`}
            key={user.id}
            className='flex flex-col items-center justify-center gap-1'
          >
            <div className='relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600'>
              <div className='p-0.5 bg-background rounded-full'>
                <img
                  src={user.profile_photo}
                  alt='Foto de perfil'
                  className='w-14 h-14 rounded-full object-cover'
                />
              </div>
            </div>

            <span className='text-xs truncate overflow-hidden max-w-14'>
              {user.username}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};
