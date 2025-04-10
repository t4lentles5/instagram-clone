import { useEffect, useRef } from 'react';
import { useSidebarStore } from '@/store/sidebar/sidebar-store';
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
      <div className="flex h-12 items-center justify-center md:h-14 md:w-full">
        <button
          className="hover:bg-background-hover flex cursor-pointer items-center justify-start gap-4 rounded-lg p-3 md:w-full"
          onClick={openNewPostDialog}
        >
          <NewPostIcon />

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

      {isNewPostDialogOpen && (
        <div className="bg-opacity-80 fixed inset-0 z-50 flex h-full w-screen items-center justify-center bg-gray-900">
          <button
            onClick={closeNewPostDialog}
            className="absolute top-3 right-2 p-2 text-white"
          >
            <XIcon />
          </button>
          <div
            ref={dialogRef}
            className="bg-popover relative flex h-4/6 w-10/12 flex-col rounded-lg md:h-[500px] md:w-[500px]"
          >
            <header className="bg-background border-separator w-full rounded-t-lg border-b p-2 text-center">
              Create new post
            </header>

            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <NewPostMediaIcons />
              <p className="text-xl">Drag photos and videos here</p>
              <button className="hover:to-buttonPrimaryHover rounded-lg p-2 text-sm font-bold text-white">
                Select from computer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
