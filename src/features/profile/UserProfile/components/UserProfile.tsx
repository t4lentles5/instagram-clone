import { User } from '@/interfaces/user.interface';

import { OptionsIcon } from '@/components/icons/OptionsIcon';
import { SimilarAccountsIcon } from '@/components/icons/SimilarAccountsIcon';

interface Props {
  user: User;
}

export const UserProfile = ({ user }: Props) => {
  console.log(user);

  return (
    <>
      <>
        <div className='hidden gap-2 md:flex'>
          <button className='rounded-lg px-4 py-[6px] text-sm font-semibold text-white'>
            Follow
          </button>

          <button className='text-primary rounded-lg px-4 py-[6px] text-sm font-semibold'>
            Message
          </button>

          <button className='text-primary rounded-lg px-2 font-semibold'>
            <SimilarAccountsIcon />
          </button>
        </div>

        <OptionsIcon />
      </>
    </>
  );
};
