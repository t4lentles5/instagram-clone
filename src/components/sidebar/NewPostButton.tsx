import { useEffect, useRef } from 'react';
import { useSidebarStore } from '@/store/ui/sidebarStore';
import { PlusCircle, X } from 'phosphor-react';

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
      <button
        className='flex items-center justify-start gap-4 p-3 transition-all rounded-lg duration-400 hover:bg-hover'
        onClick={openNewPostDialog}
      >
        <PlusCircle
          size={29}
          weight={isNewPostDialogOpen ? 'fill' : 'regular'}
        />
        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            isNewPostDialogOpen && !isSidebarCollapsed && 'font-bold'
          }`}
        >
          Create
        </span>
      </button>

      {isNewPostDialogOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center w-screen h-full bg-gray-900 bg-opacity-80'>
          <button
            onClick={closeNewPostDialog}
            className='absolute p-2 text-white top-3 right-2'
          >
            <X size={20} />
          </button>
          <div
            ref={dialogRef}
            className='relative flex flex-col bg-popover w-10/12 h-4/6 sm:w-[500px] sm:h-[500px] rounded-lg'
          >
            <header className='w-full p-2 text-center border-b rounded-t-lg bg-background border-separator'>
              Create new post
            </header>

            <div>Drag photos and videos here</div>
          </div>
        </div>
      )}
    </>
  );
};
