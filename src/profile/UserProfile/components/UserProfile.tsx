import { SimilarAccountsIcon } from '@/assets/icons/profile/SimilarAccountsIcon';
import { User } from '@/interfaces/user.interface';

interface Props {
  user: User;
}

export const UserProfile = ({ user }: Props) => {
  console.log(user);

  return (
    <>
      <>
        <div className="hidden gap-2 md:flex">
          <button className="rounded-lg px-4 py-[6px] text-sm font-semibold text-white">
            Follow
          </button>

          <button className="text-primary rounded-lg px-4 py-[6px] text-sm font-semibold">
            Message
          </button>

          <button className="text-primary rounded-lg px-2 font-semibold">
            <SimilarAccountsIcon />
          </button>
        </div>

        <svg
          aria-label="Options"
          fill="currentColor"
          height="32"
          role="img"
          viewBox="0 0 24 24"
          width="32"
        >
          <title>Options</title>
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      </>
    </>
  );
};
