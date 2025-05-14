import Link from 'next/link';

import { Follower } from '../interfaces/follower.interface';

import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { FollowUnfollowButton } from '@/core/shared/components/FollowUnfollowButton';
import { XIcon } from '@/core/shared/icons';

interface Props {
  closeModal: () => void;
  followers: Follower[];
  authenticatedUserId: string;
}

export const FollowersModalContent = ({
  closeModal,
  followers,
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
          {followers.map((follower) => (
            <div className='flex justify-between px-4 py-2' key={follower.id}>
              <div className='flex gap-3'>
                <Link href={`/${follower.username}`}>
                  <ProfilePhoto
                    profile_photo={follower.profile_photo}
                    imageSize={{ size: 'w-11' }}
                    backgroundDivSize={{ size: 'w-[48px]' }}
                    borderDivSize={{ size: 'w-[52px]' }}
                  />
                </Link>
                <div className='flex flex-col justify-center'>
                  <Link
                    href={`/${follower.username}`}
                    className='max-w-36 truncate overflow-hidden text-sm leading-[18px] font-semibold'
                  >
                    {follower.username}
                  </Link>
                  <span className='text-ig-secondary-text text-xs'>
                    {follower.fullname}
                  </span>
                </div>
              </div>

              {follower.id !== authenticatedUserId && (
                <FollowUnfollowButton userId={follower.id} inModal={true} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
