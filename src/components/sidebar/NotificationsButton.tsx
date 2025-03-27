import { useSidebarStore } from '@/store/ui/sidebar-store';
import { usePathname } from 'next/navigation';
import { Heart } from 'phosphor-react';
import { useEffect, useRef } from 'react';

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
      <button
        ref={buttonRef}
        className='nav-item'
        onClick={toggleNotifications}
      >
        <Heart
          size={29}
          weight={
            isNotificationsActive || pathname === `/notifications`
              ? 'fill'
              : 'regular'
          }
        />
        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            pathname === `/notifications` && 'font-bold'
          }`}
        >
          Notifications
        </span>
      </button>

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
