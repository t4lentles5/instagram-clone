import { useModal } from '@/core/shared/hooks/useModal';
import { useUserStore } from '@/core/store/user/user-store';

import { Modal } from '@/core/shared/components/Modal';

import { FollowersModalContent } from './FollowersModalContent';

interface Props {
  username: string;
  followersQuantity: number;
}

export const Followers = ({ username, followersQuantity }: Props) => {
  const { authenticatedUser } = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();

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
            username={username}
            authenticatedUserId={authenticatedUser.id}
          />
        </Modal>
      )}
    </>
  );
};
