'use client';

import { NewPostModal } from '@/features/posts/components/new-post/NewPostModal';
import { CameraCircleIcon } from '@/features/posts/icons';
import { useNewPostModal } from '@/features/posts/hooks/useNewPostModal';

export const NoPosts = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    newPostModalRef,
    modalOptionsRef,
    fileInputRef,
    setIsModalOptionsOpen,
    handleCloseAttempt,
  } = useNewPostModal();

  return (
    <>
      <div className='mx-11 my-[60px] flex h-full flex-col items-center justify-center'>
        <button className='cursor-pointer' onClick={openModal}>
          <CameraCircleIcon />
        </button>
        <p className='my-6 text-center text-3xl font-extrabold'>Share Photos</p>

        <p className='mb-4 text-center text-sm font-normal'>
          When you share photos, they will appear on your profile.
        </p>
        <button
          onClick={openModal}
          className='text-ig-primary-button hover:text-ig-link active:text-ig-primary-button-pressed cursor-pointer text-sm font-semibold'
        >
          Share your first photo
        </button>
      </div>

      {isOpen && (
        <NewPostModal
          closeModal={closeModal}
          newPostModalRef={newPostModalRef}
          modalOptionsRef={modalOptionsRef}
          fileInputRef={fileInputRef}
          setIsModalOptionsOpen={setIsModalOptionsOpen}
          handleCloseAttempt={handleCloseAttempt}
        />
      )}
    </>
  );
};
