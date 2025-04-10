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
import { useSidebarStore } from '@/store/sidebar/sidebar-store';
import { useThemeStore } from '@/store/theme/theme-store';

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
        className="relative hidden h-14 w-full cursor-pointer items-center justify-center md:flex"
        ref={popoverRef}
      >
        <button className="hover:bg-background-hover flex w-full cursor-pointer items-center justify-start gap-4 rounded-lg p-3 md:w-full">
          {open || switchAppearanceOpen ? (
            <MoreOptionsFillIcon />
          ) : (
            <MoreOptionsIcon />
          )}

          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${
              (open || switchAppearanceOpen) && 'font-bold'
            }`}
          >
            More
          </span>
        </button>

        <div
          className={`${
            open
              ? 'translate-y-[5px] opacity-100'
              : 'pointer-events-none -translate-x-2 opacity-0'
          } bg-popover absolute bottom-full left-14 w-[266px] transform gap-2 rounded-2xl p-2 shadow-2xl ease-in-out xl:left-0 xl:mb-1`}
        >
          <div className="border-border border-b pb-2">
            <Link
              className={`hover:bg-popoverHover flex w-full items-center justify-start gap-3 rounded-lg p-4`}
              href={'/settings'}
            >
              <SettingsIcon />
              <span className="text-sm leading-[18px]">Setting</span>
            </Link>

            <Link
              className={`hover:bg-popoverHover flex w-full items-center justify-start gap-3 rounded-lg p-4`}
              href={'/saved'}
            >
              <SavedIcon />
              <span className="text-sm leading-[18px]">Saved</span>
            </Link>

            <button
              className={`hover:bg-popoverHover flex w-full items-center justify-start gap-3 p-4 hover:rounded-lg`}
              onClick={handleSwitchAppearanceOpen}
            >
              {isDarkMode ? <MoonIcon /> : <SunIcon />}
              <span className="text-sm leading-[18px]">Switch appearance</span>
            </button>
          </div>

          <div className="border-border border-b py-2">
            <button
              className={`hover:bg-popoverHover w-full cursor-pointer p-4 text-left text-sm leading-[18px] hover:rounded-lg`}
              type="button"
              onClick={() => {}}
            >
              Switch accounts
            </button>
          </div>
          <div className="mt-2">
            <button
              className={`hover:bg-popoverHover w-full cursor-pointer p-4 text-left text-sm leading-[18px] hover:rounded-lg`}
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>

        <div
          className={`${
            switchAppearanceOpen
              ? 'translate-y-[4px] opacity-100'
              : 'pointer-events-none -translate-x-2 opacity-0'
          } bg-popover absolute bottom-full left-14 w-[266px] transform rounded-2xl shadow-2xl ease-in-out xl:left-0 xl:mb-1`}
        >
          <div className="border-border flex w-full items-center border-b p-4 hover:rounded-lg">
            <button
              className="w-6 text-[#6a6a6a]"
              onClick={handleSwitchAppearanceOpen}
            >
              <BackIcon />
            </button>
            <span className="w-[180px] text-left text-base leading-5 font-semibold">
              Switch appearance
            </span>
            <div className="flex w-[30px] justify-end">
              {isDarkMode ? <MoonSmallIcon /> : <SunSmallIcon />}
            </div>
          </div>

          <div className="items- flex w-full justify-center p-2">
            <button
              className="hover:bg-popoverHover flex w-full cursor-pointer items-center justify-between rounded-lg p-4 text-left"
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
            >
              <span className="text-left text-sm leading-[18px]">
                Dark mode
              </span>

              <label className="ml-2 inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  className="peer sr-only"
                />
                <div className="bg-primary after:bg-background relative h-4 w-[26px] rounded-full after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:transition-all peer-checked:after:translate-x-[10px]"></div>
              </label>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
