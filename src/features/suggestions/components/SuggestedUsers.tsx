import Link from 'next/link';

import { RecommendedUser } from '@/features/suggestions/interfaces/recommended-user.interface';
import { SuggestedUser } from '@/features/suggestions/components/SuggestedUser';

interface Props {
  users: RecommendedUser[];
}

export const SuggestedUsers = ({ users }: Props) => {
  return (
    <>
      <div className='mx-4 my-1 flex items-center justify-between'>
        <span className='text-ig-secondary-text text-sm leading-[11px] font-semibold'>
          Suggested for you
        </span>
        <Link
          href={'/explore/people'}
          className='text-ig-primary-text hover:text-ig-secondary-text text-xs leading-[16px] font-semibold'
        >
          See All
        </Link>
      </div>

      <div className='mb-1 ml-1 py-2'>
        {users.map((user) => (
          <SuggestedUser user={user} key={user.id} />
        ))}
      </div>
    </>
  );
};
