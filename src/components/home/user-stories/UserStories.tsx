import { User } from '@/interfaces/user.interface';
import Link from 'next/link';

interface Props {
  users: User[];
}

export const UserStories = ({ users }: Props) => {
  return (
    <>
      <div className='flex w-full gap-[10px] py-2 mb-6'>
        {users.map((user) => (
          <Link
            href={`/stories/${user.username}`}
            key={user.id}
            className='flex flex-col items-center justify-center'
          >
            <div className='px-1 pb-1'>
              <div className='p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600'>
                <div className='p-0.5 bg-background rounded-full'>
                  <img
                    src={user.profile_photo}
                    alt='Foto de perfil'
                    className='object-cover rounded-full w-14 h-14'
                  />
                </div>
              </div>
            </div>

            <span className='overflow-hidden text-[#a8a8a8] text-xs truncate max-w-14'>
              {user.username}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};
