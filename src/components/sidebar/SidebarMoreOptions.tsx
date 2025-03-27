'use client';

import { logout } from '@/actions/auth/logout';
import { useSidebarStore } from '@/store/ui/sidebar-store';
import { useThemeStore } from '@/store/ui/theme-store';
import Link from 'next/link';
import {
  BookmarkSimple,
  CaretLeft,
  Gear,
  List,
  Moon,
  Sun,
  ToggleLeft,
  ToggleRight,
} from 'phosphor-react';
import { useState, useRef, useEffect } from 'react';

export const SidebarMoreOptions = () => {
  const { isSidebarCollapsed } = useSidebarStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const [open, setOpen] = useState(false);
  const [switchAppearanceOpen, setSwitchAppearanceOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(!open);
    if (open === false) {
      setSwitchAppearanceOpen(false);
    }
  };

  const handleSwitchAppearanceOpen = () => {
    setSwitchAppearanceOpen(!switchAppearanceOpen);
    setOpen(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
      setSwitchAppearanceOpen(false);
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
        className='relative items-center justify-center hidden w-full h-16 cursor-pointer md:flex'
        ref={popoverRef}
      >
        <button className='nav-item w-full'>
          <List size={29} weight={open ? 'bold' : 'light'} />
          <span
            className={`${
              isSidebarCollapsed ? 'hidden ' : 'xl:block '
            } hidden ${open && 'font-bold'}`}
          >
            More
          </span>
        </button>

        <div
          className={`${
            open
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-x-2 pointer-events-none'
          } absolute w-[256px] p-2 flex flex-col items-center justify-center shadow-2xl rounded-lg gap-2 xl:mb-1 left-14 xl:left-0 bg-popover bottom-full transform   ease-in-out`}
        >
          <Link
            className={`flex items-center justify-start w-full gap-4 p-3   rounded-lg hover:bg-popoverHover`}
            href={'/settings'}
          >
            <Gear size={20} />
            Setting
          </Link>

          <Link
            className={`flex items-center justify-start w-full gap-4 p-3   rounded-lg hover:bg-popoverHover`}
            href={'/saved'}
          >
            <BookmarkSimple size={20} />
            Saved
          </Link>

          <button
            className={`flex items-center justify-start w-full gap-4 p-3   hover:rounded-lg border-b border-separator hover:bg-popoverHover`}
            onClick={handleSwitchAppearanceOpen}
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            Switch appearance
          </button>

          <button
            className={`w-full p-3 px-4 py-2 text-left -colors  border-b cursor-pointer hover:rounded-lg text-text hover:bg-popoverHover border-separator`}
            type='button'
            onClick={() => {}}
          >
            Switch Accounts
          </button>
          <button
            className={`w-full p-3 px-4 py-2 text-left -colors  rounded-lg cursor-pointer text-text hover:bg-popoverHover`}
            type='button'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div
          className={`${
            switchAppearanceOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-x-2 pointer-events-none'
          } absolute w-[256px] p-2 flex flex-col items-center justify-center shadow-2xl rounded-lg gap-2 xl:mb-1 left-14 xl:left-0 bg-popover bottom-full transform   ease-in-out`}
        >
          <div className='flex items-center w-full border-b border-separator hover:rounded-lg'>
            <button className='p-3' onClick={handleSwitchAppearanceOpen}>
              <CaretLeft size={16} />
            </button>
            <div className='flex items-center justify-between w-full'>
              <span className='text-left'>Switch appearance</span>
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </div>
          </div>

          <div className='flex items-center w-full'>
            <button
              className='flex justify-between w-full p-3 px-4 py-2 text-left -colors  rounded-lg cursor-pointer text-text hover:bg-popoverHover'
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
            >
              <span className='text-left'>Dark mode</span>
              {isDarkMode ? (
                <ToggleRight
                  size={20}
                  weight='fill'
                  className='text-foreground'
                />
              ) : (
                <ToggleLeft
                  size={20}
                  weight='fill'
                  className='text-foreground'
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
