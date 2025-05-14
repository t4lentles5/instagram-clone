'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useModal } from '@/core/shared/hooks/useModal';
import { useUserStore } from '@/core/store/user/user-store';

import { Modal } from '@/core/shared/components/Modal';
import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { FollowUnfollowButton } from '@/core/shared/components/FollowUnfollowButton';
import { getFollowersWithFollowing } from '../actions/get-followers-by-username';

import { XIcon } from '@/core/shared/icons';

interface Follower {
  id: string;
  username: string;
  fullname: string;
  profile_photo: string | null;
}

interface Props {
  username: string;
  followersQuantity: number;
}

export const Followers = ({ username, followersQuantity }: Props) => {
  const { authenticatedUser } = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();
  const [followers, setFollowers] = useState<Follower[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!authenticatedUser?.id) return;

      const result = await getFollowersWithFollowing(username);

      setFollowers(result);
    };

    if (isOpen) fetchFollowers();
  }, [isOpen, username, authenticatedUser]);

  return (
    <>
      <button
        className='active:text-ig-primary-text-pressed px-2 font-bold'
        onClick={openModal}
      >
        {followersQuantity}{' '}
        <span className='text-ig-secondary-text active:text-ig-secondary-text-pressed cursor-pointer font-normal'>
          followers
        </span>
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className='text-ig-primary-text w-[400px]'>
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
                <div
                  className='flex justify-between px-4 py-2'
                  key={follower.id}
                >
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

                  {follower.id !== authenticatedUser.id && (
                    <FollowUnfollowButton userId={follower.id} inModal={true} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
