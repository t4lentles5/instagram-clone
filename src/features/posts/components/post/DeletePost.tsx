import { useModal } from '@/core/shared/hooks/useModal';
import { Modal } from '@/core/shared/components/Modal';
import { deletePost } from '../../actions/delete-post';

interface Props {
  postId: string;
  closeOptionsModal: () => void;
  closePostModal?: () => void;
}

export const DeletePost = ({
  postId,
  closeOptionsModal,
  closePostModal,
}: Props) => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleDelete = async () => {
    await deletePost(postId);
    closeModal();
    closeOptionsModal();
    closePostModal?.();
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleOpenDeleteModal = () => {
    openModal();
  };

  return (
    <>
      <button
        onClick={handleOpenDeleteModal}
        className='text-ig-badge active:bg-ig-option-pressed h-12 cursor-pointer text-sm font-bold'
      >
        Delete
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className='flex w-[400px] flex-col items-center text-center'>
            <div className='p-6'>
              <h3 className='text-ig-primary-text mb-1 text-xl'>
                Delete post?
              </h3>
              <p className='text-ig-secondary-text text-sm'>
                Are you sure you want to delete this post?
              </p>
            </div>

            <div className='border-ig-elevated-separator flex w-full flex-col border-t'>
              <button
                className='text-ig-badge h-12 w-full cursor-pointer px-2 py-1 text-sm font-bold'
                onClick={handleDelete}
              >
                Delete
              </button>

              <button
                className='text-ig-primary-text border-ig-elevated-separator h-12 w-full cursor-pointer border-t px-2 py-1 text-sm'
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
