import { useQuery } from '@tanstack/react-query';

import { useModal } from '@/core/shared/hooks/useModal';
import { Modal } from '@/core/shared/components/Modal';

import { FollowingModalContent } from './FollowingModalContent';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

interface Props {
  username: string;
  followingQuantity: number;
}

export const Following = ({ username, followingQuantity }: Props) => {
  const { data: authenticatedUser } = useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: () => getAuthenticatedUser(),
    staleTime: 1000 * 60 * 10,
  });

  const { isOpen, openModal, closeModal } = useModal();

  if (!authenticatedUser) {
    return null;
  }

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
