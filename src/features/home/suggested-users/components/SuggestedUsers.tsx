import { User } from '@/interfaces/user.interface';
import Link from 'next/link';
import { SuggestedUser } from './SuggestedUser';

interface Props {
  users: User[];
}

export const SuggestedUsers = ({ users }: Props) => {
  return (
    <>
      <div className="mx-4 my-1 flex items-center justify-between">
        <span className="text-secondary text-sm leading-[11px] font-semibold">
          Suggested for you
        </span>
        <Link
          href={'/explore/people'}
          className="text-primary hover:text-secondary text-xs leading-[16px] font-semibold"
        >
          See All
        </Link>
      </div>

      <div className="mb-1 ml-1 py-2">
        {users.map((user) => (
          <SuggestedUser user={user} key={user.id} />
        ))}
      </div>
    </>
  );
};
