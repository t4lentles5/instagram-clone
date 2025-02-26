import { useSidebarStore } from '@/store/ui/sidebarStore';
import { usePathname } from 'next/navigation';
import { Heart } from 'phosphor-react';
import { useEffect, useRef } from 'react';

export const NotificationsButton = () => {
  const pathname = usePathname();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const buttonNotificationsRef = useRef<HTMLButtonElement>(null);
  const {
    isSidebarCollapsed,
    isNotificationsActive,
    toggleNotifications,
    resetSidebar,
  } = useSidebarStore();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonNotificationsRef.current &&
      !buttonNotificationsRef.current.contains(event.target as Node) &&
      notificationsRef.current &&
      !notificationsRef.current.contains(event.target as Node)
    ) {
      resetSidebar();
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
      <button
        className='flex items-center w-full justify-start gap-4 p-3 transition-all duration-400 rounded-lg hover:bg-hover'
        onClick={toggleNotifications}
        ref={buttonNotificationsRef}
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

      <div
        ref={notificationsRef}
        className={`${
          isSidebarCollapsed && isNotificationsActive
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-x-2 pointer-events-none'
        } w-[400px] border-separator border-r absolute bottom-0 z-50 flex flex-col justify-start gap-4 h-screen overflow-hidden rounded-lg left-[72px] bg-background transform origin-left transition-all duration-400 ease-in-out`}
      >
        Notifications
      </div>
    </>
  );
};
