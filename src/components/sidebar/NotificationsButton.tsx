import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { NotificationsFIllIcon } from '@/assets/icons/sidebar/sidebar-nav/notifications/NotificationsFIllIcon';
import { NotificationsIcon } from '@/assets/icons/sidebar/sidebar-nav/notifications/NotificationsIcon';
import { useSidebarStore } from '@/store/ui/sidebar-store';

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

  return (
    <>
      <div className='items-center justify-center hidden md:flex md:w-full h-14'>
        <button
          ref={buttonRef}
          className='items-center justify-start hidden w-full gap-4 p-3 rounded-lg md:flex hover:bg-hover'
          onClick={toggleNotifications}
        >
          {isNotificationsActive || pathname === `/notifications` ? (
            <NotificationsFIllIcon />
          ) : (
            <NotificationsIcon />
          )}
          <span
            className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
              pathname === `/notifications` && 'font-bold'
            }`}
          >
            Notifications
          </span>
        </button>
      </div>

      {isNotificationsActive && (
        <div
          ref={notificationRef}
          className={`${
            isSidebarCollapsed && isNotificationsActive
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-x-2 pointer-events-none'
          } w-[400px] border-separator border-r absolute bottom-0 z-50 flex flex-col justify-start gap-4 h-screen overflow-hidden rounded-lg left-[72px] bg-background transform origin-left   ease-in-out`}
        >
          Notifications
        </div>
      )}
    </>
  );
};
