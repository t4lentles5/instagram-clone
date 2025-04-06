import { User } from '@/interfaces/user.interface';
import Link from 'next/link';

interface Props {
  user: User;
}

export const SwitchUser = ({ user }: Props) => {
  return (
    <>
      <div className="mb-5 flex justify-between px-4">
        <div className="flex gap-3">
          <img
            src={user.profile_photo}
            alt="profile photo"
            className="border-border h-11 w-11 rounded-full border object-contain"
          />

          <div className="flex flex-col justify-center">
            <Link
              href={`/${user.username}`}
              className="max-w-36 truncate overflow-hidden text-sm leading-[18px] font-semibold"
            >
              {user.username}
            </Link>
            <span className="text-secondary text-sm leading-[18px]">
              {user.fullname}
            </span>
          </div>
        </div>

        <button className="text-blue hover:text-blue-hover text-xs font-semibold">
          Switch
        </button>
      </div>
    </>
  );
};
