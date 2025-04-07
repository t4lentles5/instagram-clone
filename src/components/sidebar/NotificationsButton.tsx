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
      <div className="hidden h-12 items-center justify-center md:flex md:h-14 md:w-full">
        <button
          ref={buttonRef}
          className="hover:bg-background-hover hidden w-full cursor-pointer items-center justify-start gap-4 rounded-lg p-3 md:flex"
          onClick={toggleNotifications}
        >
          {isNotificationsActive || pathname === `/notifications` ? (
            <NotificationsFIllIcon />
          ) : (
            <NotificationsIcon />
          )}
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
          className={`${
            isSidebarCollapsed && isNotificationsActive
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-x-2 opacity-0'
          } border-border bg-background absolute bottom-0 left-[72px] z-50 flex h-screen w-[400px] origin-left transform flex-col justify-start gap-4 overflow-hidden rounded-lg border-r ease-in-out`}
        >
          Notifications
        </div>
      )}
    </>
  );
};
