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
      <button className='nav-item' onClick={openNewPostDialog}>
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
            className='relative flex flex-col bg-popover w-10/12 h-4/6 md:w-[500px] md:h-[500px] rounded-lg'
          >
            <header className='w-full p-2 text-center border-b rounded-t-lg bg-background border-separator'>
              Create new post
            </header>

            <div className='flex flex-col items-center justify-center w-full h-full gap-4'>
              <svg
                aria-label='Icon to represent media such as images or videos'
                className='text-foreground'
                fill='currentColor'
                height='77'
                role='img'
                viewBox='0 0 97.6 77.3'
                width='96'
              >
                <title>Icon to represent media such as images or videos</title>
                <path
                  d='M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z'
                  fill='currentColor'
                ></path>
                <path
                  d='M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z'
                  fill='currentColor'
                ></path>
                <path
                  d='M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z'
                  fill='currentColor'
                ></path>
              </svg>
              <p className='text-xl'>Drag photos and videos here</p>
              <button className='p-2 text-sm font-bold text-white transition-all duration-300 rounded-lg bg-buttonPrimary hover:to-buttonPrimaryHover'>
                Select from computer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
