import { User } from '@/interfaces/user.interface';
import Link from 'next/link';
import { SuggestedUser } from './SuggestedUser';

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
          <SuggestedUser user={user} key={user.id} />
        ))}
      </div>
    </>
  );
};
