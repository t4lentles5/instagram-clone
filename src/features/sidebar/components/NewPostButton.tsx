import { useSidebarStore } from '@/features/sidebar/stores/sidebar-store';
import { NewPostSidebarIcon } from '@/features/sidebar/icons';
import { useNewPostModal } from '@/features/posts/hooks/useNewPostModal';
import { NewPostModal } from '@/features/posts/components/new-post/NewPostModal';

export const NewPostButton = () => {
  const { isSidebarCollapsed, isNewPostDialogOpen } = useSidebarStore();

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
      <div className='flex h-12 items-center justify-center md:h-14 md:w-full'>
        <button
          className='md:hover:bg-ig-hover-overlay active:bg-ig-active-overlay active:text-ig-primary-text/50 flex cursor-pointer items-center justify-start gap-4 rounded-lg p-3 active:scale-95 md:w-full'
          onClick={openModal}
        >
          <NewPostSidebarIcon />

          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${
              isNewPostDialogOpen && !isSidebarCollapsed && 'font-bold'
            }`}
          >
            Create
          </span>
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
