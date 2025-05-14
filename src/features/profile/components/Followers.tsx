'use client';

import { useEffect, useState } from 'react';

import { useModal } from '@/core/shared/hooks/useModal';
import { useUserStore } from '@/core/store/user/user-store';

import { Modal } from '@/core/shared/components/Modal';

import { getFollowersWithFollowing } from '../actions/get-followers-by-username';

import { FollowersModalContent } from './FollowersModalContent';
import { Follower } from '../interfaces/follower.interface';

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
          <FollowersModalContent
            closeModal={closeModal}
            followers={followers}
            authenticatedUserId={authenticatedUser.id}
          />
        </Modal>
      )}
    </>
  );
};
