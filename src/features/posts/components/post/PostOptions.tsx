import { MoreOptionsIcon } from '@/core/shared/icons';
import { useModal } from '@/core/shared/hooks/useModal';
import { Modal } from '@/core/shared/components/Modal';
import { useUserStore } from '@/core/store/user/user-store';
import { DeletePost } from './DeletePost';

interface Props {
  authorId: string;
  postId: string;
}

export const PostOptions = ({ authorId, postId }: Props) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { authenticatedUser } = useUserStore();

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

                <button className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'>
                  Go to post
                </button>

                <button className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className='text-ig-badge active:bg-ig-option-pressed h-12 cursor-pointer text-sm font-bold'>
                  Report
                </button>

                <button className='text-ig-badge active:bg-ig-option-pressed h-12 cursor-pointer text-sm font-bold'>
                  Unfollow
                </button>

                <button className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'>
                  Go to post
                </button>

                <button className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'>
                  Copy link
                </button>

                <button className='active:bg-ig-option-pressed h-12 cursor-pointer text-sm'>
                  Cancel
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};
