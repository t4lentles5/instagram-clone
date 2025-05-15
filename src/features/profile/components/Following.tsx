import { useModal } from '@/core/shared/hooks/useModal';
import { useUserStore } from '@/core/store/user/user-store';

import { Modal } from '@/core/shared/components/Modal';

import { FollowingModalContent } from './FollowingModalContent';

interface Props {
  username: string;
  followingQuantity: number;
}

export const Following = ({ username, followingQuantity }: Props) => {
  const { authenticatedUser } = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();

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
          <FollowingModalContent
            closeModal={closeModal}
            username={username}
            authenticatedUserId={authenticatedUser.id}
          />
        </Modal>
      )}
    </>
  );
};
