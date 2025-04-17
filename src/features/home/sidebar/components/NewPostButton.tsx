import { useState } from 'react';

import { useSidebarStore } from '@/store/sidebar/sidebar-store';
import { NewPostModal } from '@/features/home/sidebar/components/NewPostModal';

import { NewPostIcon } from '@/components/icons/NewPostIcon';

export const NewPostButton = () => {
  const { isSidebarCollapsed, isNewPostDialogOpen } = useSidebarStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='flex h-12 items-center justify-center md:h-14 md:w-full'>
        <button
          className='hover:bg-background-hover flex cursor-pointer items-center justify-start gap-4 rounded-lg p-3 md:w-full'
          onClick={() => setIsOpen(true)}
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

      <NewPostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
