import { User } from '@/interfaces/user.interface';
import Link from 'next/link';
import { SuggestedUser } from './SuggestedUser';

interface Props {
  users: User[];
}

export const SuggestedUsers = ({ users }: Props) => {
  return (
    <>
      <div className='flex items-center justify-between mx-4 my-1'>
        <span className='text-sm leading-[11px] font-semibold text-foregroundSecondary'>
          Suggested for you
        </span>
        <Link
          href={'/explore/people'}
          className='text-xs leading-[16px] font-semibold'
        >
          See All
        </Link>
      </div>

      <div className='ml-1 mb-1 py-2'>
        {users.map((user) => (
          <SuggestedUser user={user} key={user.id} />
        ))}
      </div>
    </>
  );
};
