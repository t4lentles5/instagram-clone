import { useEffect, useRef } from 'react';
import { useSidebarStore } from '@/store/ui/sidebar-store';
import { NewPostIcon } from '@/assets/icons/sidebar/sidebar-nav/new-post/NewPostIcon';
import { XIcon } from '@/assets/icons/XIcon';
import { NewPostMediaIcons } from '@/assets/icons/NewPostMediaIcons';

export const NewPostButton = () => {
  const {
    isSidebarCollapsed,
    isNewPostDialogOpen,
    openNewPostDialog,
    closeNewPostDialog,
  } = useSidebarStore();

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        closeNewPostDialog();
      }
    };

    if (isNewPostDialogOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNewPostDialogOpen, closeNewPostDialog]);

  return (
    <>
      <div className='flex items-center justify-center md:w-full h-14'>
        <button className='nav-item' onClick={openNewPostDialog}>
          <NewPostIcon />

          <span
            className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
              isNewPostDialogOpen && !isSidebarCollapsed && 'font-bold'
            }`}
          >
            Create
          </span>
        </button>
      </div>

      {isNewPostDialogOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center w-screen h-full bg-gray-900 bg-opacity-80'>
          <button
            onClick={closeNewPostDialog}
            className='absolute p-2 text-white top-3 right-2'
          >
            <XIcon />
          </button>
          <div
            ref={dialogRef}
            className='relative flex flex-col bg-popover w-10/12 h-4/6 md:w-[500px] md:h-[500px] rounded-lg'
          >
            <header className='w-full p-2 text-center border-b rounded-t-lg bg-background border-separator'>
              Create new post
            </header>

            <div className='flex flex-col items-center justify-center w-full h-full gap-4'>
              <NewPostMediaIcons />
              <p className='text-xl'>Drag photos and videos here</p>
              <button className='p-2 text-sm font-bold text-white rounded-lg bg-buttonPrimary hover:to-buttonPrimaryHover'>
                Select from computer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
