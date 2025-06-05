import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { logout } from '@/features/auth/actions/logout';

import { useSidebarStore } from '@/features/sidebar/stores/sidebar-store';
import { useThemeStore } from '@/core/store/theme/theme-store';

import {
  BackMoreOptionsIcon,
  DarkModeIcon,
  SavedMoreOptionsIcon,
  SettingsMoreOptionsIcon,
  SettingsSidebarIcon,
} from '@/features/sidebar/icons';

import styles from '@/features/sidebar/components/more-options.module.css';
import switchAppearanceStyles from '@/features/sidebar/components/switch-appearance.module.css';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export const SidebarMoreOptions = () => {
  const { data: authenticatedUser } = useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: () => getAuthenticatedUser(),
    staleTime: 1000 * 60 * 10,
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { isSidebarCollapsed } = useSidebarStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [switchAppearanceOpen, setSwitchAppearanceOpen] = useState(false);
  const [showSwitchAppearanceOpen, setShowSwitchAppearanceOpen] =
    useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setMoreOptionsOpen(!moreOptionsOpen);
    if (moreOptionsOpen === false) {
      setSwitchAppearanceOpen(false);
    }
  };

  const handleSwitchAppearanceOpen = () => {
    setSwitchAppearanceOpen(!switchAppearanceOpen);
    setMoreOptionsOpen(false);
  };

  const handleLogout = async () => {
    await queryClient.invalidateQueries({ queryKey: ['authenticatedUser'] });
    await logout();
    router.refresh();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setMoreOptionsOpen(false);
      setSwitchAppearanceOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = moreOptionsOpen || switchAppearanceOpen;

  useEffect(() => {
    if (moreOptionsOpen) {
      setShowMoreOptions(true);
    } else {
      const timeout = setTimeout(() => setShowMoreOptions(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [moreOptionsOpen]);

  useEffect(() => {
    if (switchAppearanceOpen) {
      setShowSwitchAppearanceOpen(true);
    } else {
      const timeout = setTimeout(() => setShowSwitchAppearanceOpen(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [switchAppearanceOpen]);

  return (
    <>
      <div
        onClick={handleOpen}
        className='relative hidden h-14 w-full items-center justify-center md:flex'
        ref={popoverRef}
      >
        <button className='hover:bg-ig-hover-overlay active:bg-ig-active-overlay active:text-ig-primary-text/50 flex cursor-pointer items-center justify-start gap-4 rounded-lg p-3 active:scale-95 md:w-full'>
          <SettingsSidebarIcon isActive={isActive} />

          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${
              (moreOptionsOpen || switchAppearanceOpen) && 'font-bold'
            }`}
          >
            More
          </span>
        </button>

        {showMoreOptions && (
          <div
            className={`bg-ig-banner-background absolute bottom-full left-14 w-[266px] -translate-x-2 gap-2 rounded-2xl p-2 shadow-2xl xl:left-0 xl:mb-1 ${moreOptionsOpen ? styles['more-options-enter'] : styles['more-options-exit']}`}
          >
            <div className='border-ig-stroke border-b pb-2'>
              <Link
                className={`hover:bg-ig-hover-overlay active:bg-ig-active-overlay flex w-full items-center justify-start gap-3 rounded-lg p-4`}
                href={'/settings'}
              >
                <SettingsMoreOptionsIcon />
                <span className='text-sm leading-[18px]'>Setting</span>
              </Link>

              <Link
                className={`hover:bg-ig-hover-overlay active:bg-ig-active-overlay flex w-full items-center justify-start gap-3 rounded-lg p-4`}
                href={`/${authenticatedUser?.username}/saved`}
              >
                <SavedMoreOptionsIcon />
                <span className='text-sm leading-[18px]'>Saved</span>
              </Link>

              <button
                className={`hover:bg-ig-hover-overlay active:bg-ig-active-overlay flex w-full cursor-pointer items-center justify-start gap-3 p-4 hover:rounded-lg`}
                onClick={handleSwitchAppearanceOpen}
              >
                <DarkModeIcon isDarkMode={isDarkMode} />
                <span className='text-sm leading-[18px]'>
                  Switch appearance
                </span>
              </button>
            </div>

            <div className='border-ig-stroke border-b py-2'>
              <button
                className={`hover:bg-ig-hover-overlay active:bg-ig-active-overlay w-full cursor-pointer p-4 text-left text-sm leading-[18px] hover:rounded-lg`}
                type='button'
                onClick={() => {}}
              >
                Switch accounts
              </button>
            </div>
            <div className='mt-2'>
              <button
                className={`hover:bg-ig-hover-overlay active:bg-ig-active-overlay w-full cursor-pointer p-4 text-left text-sm leading-[18px] hover:rounded-lg`}
                type='button'
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        )}

        {showSwitchAppearanceOpen && (
          <div
            className={`bg-ig-banner-background absolute bottom-full left-14 w-[266px] transform rounded-2xl shadow-2xl ease-in-out xl:left-0 xl:mb-1 ${switchAppearanceOpen ? switchAppearanceStyles['switch-appearance-enter'] : switchAppearanceStyles['switch-appearance-exit']}`}
          >
            <div className='border-ig-stroke flex w-full items-center border-b p-4 hover:rounded-lg'>
              <button
                className='text-secondary w-6 cursor-pointer'
                onClick={handleSwitchAppearanceOpen}
              >
                <BackMoreOptionsIcon />
              </button>
              <span className='w-[180px] text-left text-base leading-5 font-semibold'>
                Switch appearance
              </span>
              <div className='flex w-[30px] justify-end'>
                <DarkModeIcon isDarkMode={isDarkMode} />
              </div>
            </div>

            <div className='items- flex w-full justify-center p-2'>
              <button
                className='hover:bg-ig-hover-overlay active:bg-ig-active-overlay flex w-full cursor-pointer items-center justify-between rounded-lg p-4 text-left'
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
              >
                <span className='text-left text-sm leading-[18px]'>
                  Dark mode
                </span>

                <label className='ml-2 inline-flex items-center'>
                  <input
                    type='checkbox'
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    className='peer sr-only'
                  />
                  <div className='bg-ig-primary-text after:bg-ig-primary-background relative h-4 w-[26px] rounded-full after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:transition-all peer-checked:after:translate-x-[10px]'></div>
                </label>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
