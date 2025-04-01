'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { logout } from '@/actions/auth/logout';
import { MoonIcon } from '@/assets/icons/sidebar/more-options/MoonIcon';
import { BackIcon } from '@/assets/icons/sidebar/more-options/BackSmallIcon';
import { MoonSmallIcon } from '@/assets/icons/sidebar/more-options/MoonSmallIcon';
import { SunSmallIcon } from '@/assets/icons/sidebar/more-options/SunSmallIcon';
import { MoreOptionsFillIcon } from '@/assets/icons/sidebar/more-options/MoreOptionsFillIcon';
import { MoreOptionsIcon } from '@/assets/icons/sidebar/more-options/MoreOptionsIcon';
import { SavedIcon } from '@/assets/icons/sidebar/more-options/SavedIcon';
import { SettingsIcon } from '@/assets/icons/sidebar/more-options/SettingsIcon';
import { SunIcon } from '@/assets/icons/sidebar/more-options/SunIcon';
import { useSidebarStore } from '@/store/ui/sidebar-store';
import { useThemeStore } from '@/store/ui/theme-store';

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
        className='relative items-center justify-center hidden w-full cursor-pointer h-14 md:flex'
        ref={popoverRef}
      >
        <button className='w-full nav-item'>
          {open ? <MoreOptionsFillIcon /> : <MoreOptionsIcon />}

          <span
            className={`${
              isSidebarCollapsed ? 'hidden ' : 'xl:block '
            } hidden leading-5 ${open && 'font-bold'}`}
          >
            More
          </span>
        </button>

        <div
          className={`${
            open
              ? 'opacity-100 translate-y-[5px]'
              : 'opacity-0 -translate-x-2 pointer-events-none'
          } absolute w-[266px] p-2 shadow-2xl rounded-2xl gap-2 xl:mb-1 left-14 xl:left-0 bg-popover bottom-full transform ease-in-out`}
        >
          <div className='pb-2 border-b border-separator'>
            <Link
              className={`flex items-center justify-start w-full gap-3 p-4 rounded-lg hover:bg-popoverHover`}
              href={'/settings'}
            >
              <SettingsIcon />
              <span className='text-sm leading-[18px]'>Setting</span>
            </Link>

            <Link
              className={`flex items-center justify-start w-full gap-3 p-4 rounded-lg hover:bg-popoverHover`}
              href={'/saved'}
            >
              <SavedIcon />
              <span className='text-sm leading-[18px]'>Saved</span>
            </Link>

            <button
              className={`flex items-center justify-start w-full gap-3 p-4 hover:rounded-lg hover:bg-popoverHover`}
              onClick={handleSwitchAppearanceOpen}
            >
              {isDarkMode ? <MoonIcon /> : <SunIcon />}
              <span className='text-sm leading-[18px]'>Switch appearance</span>
            </button>
          </div>

          <div className='py-2 border-b border-separator'>
            <button
              className={`w-full text-sm leading-[18px] p-4 text-left cursor-pointer hover:rounded-lg hover:bg-popoverHover`}
              type='button'
              onClick={() => {}}
            >
              Switch accounts
            </button>
          </div>
          <div className='mt-2'>
            <button
              className={`w-full p-4 text-left text-sm leading-[18px] cursor-pointer hover:rounded-lg hover:bg-popoverHover`}
              type='button'
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>

        <div
          className={`${
            switchAppearanceOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-x-2 pointer-events-none'
          } absolute w-[256px] p-2 flex flex-col items-center justify-center shadow-2xl rounded-lg gap-2 xl:mb-1 left-14 xl:left-0 bg-popover bottom-full transform   ease-in-out`}
        >
          <div className='flex items-center w-full border-b border-separator hover:rounded-lg'>
            <button className='px-3' onClick={handleSwitchAppearanceOpen}>
              <BackIcon />
            </button>
            <div className='flex items-center justify-between w-full p-3'>
              <span className='text-left'>Switch appearance</span>
              {isDarkMode ? <MoonSmallIcon /> : <SunSmallIcon />}
            </div>
          </div>

          <div className='flex justify-center w-full items-'>
            <button
              className='flex items-center justify-between w-full p-3 px-4 py-2 text-left rounded-lg cursor-pointer hover:bg-popoverHover'
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
            >
              <span className='text-left'>Dark mode</span>

              <label className='inline-flex items-center ml-2'>
                <input
                  type='checkbox'
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  className='sr-only peer'
                />
                <div className='relative w-7 h-4 bg-foreground rounded-full peer-checked:after:translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-background after:rounded-full after:h-3 after:w-3 after:transition-all'></div>
              </label>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
