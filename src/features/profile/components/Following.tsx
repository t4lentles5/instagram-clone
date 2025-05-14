import { useEffect, useState } from 'react';

import { useModal } from '@/core/shared/hooks/useModal';
import { useUserStore } from '@/core/store/user/user-store';

import { Follow } from '../interfaces/follow.interface';
import { getFollowingByUsername } from '../actions/get-following-by-username';

import { Modal } from '@/core/shared/components/Modal';
import { FollowModalContent } from './FollowsModalContent';

interface Props {
  username: string;
  followingQuantity: number;
}

export const Following = ({ username, followingQuantity }: Props) => {
  const { authenticatedUser } = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();
  const [following, setFollowing] = useState<Follow[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!authenticatedUser.id) return;

      const result = await getFollowingByUsername(username);

      setFollowing(result);
    };

    if (isOpen) fetchFollowers();
  }, [isOpen, username, authenticatedUser]);

  return (
    <>
      <button
        className='active:text-ig-primary-text-pressed px-2 font-bold'
        onClick={openModal}
      >
        {followingQuantity}{' '}
        <span className='text-ig-secondary-text active:text-ig-secondary-text-pressed cursor-pointer font-normal'>
          following
        </span>
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <FollowModalContent
            closeModal={closeModal}
            follows={following}
            authenticatedUserId={authenticatedUser.id}
          />
        </Modal>
      )}
    </>
  );
};
