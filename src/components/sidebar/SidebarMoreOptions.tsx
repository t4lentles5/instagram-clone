'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookmarkSimple, Gear, List, Moon } from 'phosphor-react';
import { useState, useRef, useEffect } from 'react';

export const SidebarMoreOptions = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const handleOpen = () => setOpen(!open);

  const handleLogout = async () => {
    // await logout();
    router.push('/auth/login');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        onClick={handleOpen}
        className='relative items-center justify-center hidden w-full h-16 cursor-pointer sm:flex'
        ref={popoverRef}
      >
        <button className='flex items-center justify-start w-full gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'>
          <List size={29} weight={open ? 'bold' : 'light'} />
          <span className={`${open && 'font-bold'}`}>More</span>
        </button>
        {open && (
          <div
            className={`absolute flex flex-col items-center justify-center w-[256px] p-2 overflow-hidden shadow-2xl rounded-lg gap-2 xl:mb-1 left-14 xl:left-0 bg-popover bottom-full`}
          >
            <Link
              className='flex items-center justify-start w-full gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
              href={'/settings'}
            >
              <Gear size={20} />
              Setting
            </Link>

            <Link
              className='flex items-center justify-start w-full gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
              href={'/saved'}
            >
              <BookmarkSimple size={20} />
              Saved
            </Link>

            <button className='flex items-center justify-start w-full gap-4 p-3 transition-all duration-300 border-b hover:rounded-lg hover:bg-hover border-separator'>
              <Moon size={20} />
              Switch appearance
            </button>

            <button
              className='w-full gap-3 px-4 py-2 text-left transition-colors duration-300 border-b cursor-pointer hover:rounded-lg text-text hover:bg-hover border-separator'
              type='button'
              onClick={handleLogout}
            >
              Switch Accounts
            </button>
            <button
              className='w-full gap-3 px-4 py-2 text-left transition-colors duration-300 rounded-lg cursor-pointer text-text hover:bg-hover'
              type='button'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
