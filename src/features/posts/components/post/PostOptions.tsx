import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { MoreOptionsIcon } from '@/core/shared/icons';
import { useModal } from '@/core/shared/hooks/useModal';
import { Modal } from '@/core/shared/components/Modal';
import { DeletePost } from './DeletePost';
import { unfollow } from '@/core/shared/actions/unfollow';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

interface Props {
  authorId: string;
  postId: string;
}

export const PostOptions = ({ authorId, postId }: Props) => {
  const { data: authenticatedUser } = useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: () => getAuthenticatedUser(),
    staleTime: 1000 * 60 * 10,
  });

  const { isOpen, openModal, closeModal } = useModal();

  const router = useRouter();

  if (!authenticatedUser) {
    return null;
  }

  const isAuthor = authorId === authenticatedUser.id;

  return (
    <>
      <button
        className='flex w-8 cursor-pointer justify-end'
        onClick={openModal}
      >
        <MoreOptionsIcon />
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className='divide-ig-elevated-separator flex w-[400px] flex-col divide-y'>
            {isAuthor ? (
              <>
                <DeletePost postId={postId} closeOptionsModal={closeModal} />

                <button className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'>
                  Edit
                </button>

                <button
                  onClick={() => {
                    router.push(`/p/${postId}`);
                    closeModal();
                  }}
                  className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'
                >
                  Go to post
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/p/${postId}`,
                    );
                    closeModal();
                  }}
                  className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'
                >
                  Copy link
                </button>
              </>
            ) : (
              <>
                {/* <button className='text-ig-badge active:bg-ig-option-pressed h-12 cursor-pointer text-sm font-bold'>
                  Report
                </button> */}

                <button
                  className='text-ig-badge active:bg-ig-option-pressed h-12 cursor-pointer text-sm font-bold'
                  onClick={() => {
                    unfollow(authorId);
                    closeModal();
                  }}
                >
                  Unfollow
                </button>

                <button
                  onClick={() => {
                    router.push(`/p/${postId}`);
                    closeModal();
                  }}
                  className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'
                >
                  Go to post
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/p/${postId}`,
                    );
                    closeModal();
                  }}
                  className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'
                >
                  Copy link
                </button>
              </>
            )}

            <button
              className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
