import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useSidebarStore } from '@/store/sidebar/sidebar-store';

import { HeartIcon } from '@/shared/icons';

export const NotificationsButton = () => {
  const pathname = usePathname();
  const { isSidebarCollapsed, isNotificationsActive, toggleNotifications } =
    useSidebarStore();
  const notificationRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        buttonRef.current.contains(event.target as Node)
      ) {
        return;
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        if (isNotificationsActive) {
          toggleNotifications();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsActive, toggleNotifications]);

  const isActive = isNotificationsActive || pathname === '/notifications';

  return (
    <>
      <div className='hidden h-12 items-center justify-center md:flex md:h-14 md:w-full'>
        <button
          ref={buttonRef}
          className={`${isSidebarCollapsed && isNotificationsActive && 'border-grey-2 border'} hover:bg-ig-hover-overlay active:bg-ig-active-overlay active:text-ig-primary-text/50 flex cursor-pointer items-center justify-start gap-4 rounded-lg p-3 active:scale-95 md:w-full`}
          onClick={toggleNotifications}
        >
          <HeartIcon isActive={isActive} type={'notification'} size={24} />
          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${pathname === `/notifications` && 'font-bold'}`}
          >
            Notifications
          </span>
        </button>
      </div>

      {isNotificationsActive && (
        <div
          ref={notificationRef}
          className={`border-ig-separator bg-ig-primary-background absolute bottom-0 left-[73px] flex h-screen w-[400px] flex-col justify-start gap-4 overflow-hidden rounded-lg border-r`}
        >
          Notifications
        </div>
      )}
    </>
  );
};
