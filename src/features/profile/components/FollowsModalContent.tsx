import Link from 'next/link';

import { Follow } from '../interfaces/follow.interface';

import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { FollowUnfollowButton } from '@/core/shared/components/FollowUnfollowButton';
import { XIcon } from '@/core/shared/icons';

interface Props {
  closeModal: () => void;
  follows: Follow[];
  authenticatedUserId: string;
}

export const FollowModalContent = ({
  closeModal,
  follows,
  authenticatedUserId,
}: Props) => {
  return (
    <>
      <div className='w-[400px]'>
        <div className='border-ig-elevated-separator flex h-[43px] border-b'>
          <div className='w-12'></div>
          <h2 className='grid grow place-items-center font-semibold'>
            Followers
          </h2>
          <button
            onClick={() => closeModal()}
            className='grid w-12 cursor-pointer place-items-center'
          >
            <XIcon />
          </button>
        </div>
        <div className='h-[356px] overflow-y-auto'>
          {follows.map((follow) => (
            <div className='flex justify-between px-4 py-2' key={follow.id}>
              <div className='flex gap-3'>
                <Link href={`/${follow.username}`}>
                  <ProfilePhoto
                    profile_photo={follow.profile_photo}
                    imageSize={{ size: 'w-11' }}
                    backgroundDivSize={{ size: 'w-[48px]' }}
                    borderDivSize={{ size: 'w-[52px]' }}
                  />
                </Link>
                <div className='flex flex-col justify-center'>
                  <Link
                    href={`/${follow.username}`}
                    className='max-w-36 truncate overflow-hidden text-sm leading-[18px] font-semibold'
                  >
                    {follow.username}
                  </Link>
                  <span className='text-ig-secondary-text text-xs'>
                    {follow.fullname}
                  </span>
                </div>
              </div>

              {follow.id !== authenticatedUserId && (
                <FollowUnfollowButton userId={follow.id} inModal={true} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
