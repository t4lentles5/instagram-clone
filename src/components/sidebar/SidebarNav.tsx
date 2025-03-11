'use client';

import { useSidebarStore } from '@/store/ui/sidebarStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, House, MessengerLogo, User } from 'phosphor-react';
import { SearchButton } from './SearchButton';
import { NotificationsButton } from './NotificationsButton';
import { NewPostButton } from './NewPostButton';

export const SidebarNav = () => {
  const pathname = usePathname();
  const { isSidebarCollapsed } = useSidebarStore();

  return (
    <nav className='flex justify-around sm:gap-1 sm:flex-col'>
      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all rounded-lg duration-400 hover:bg-hover'
        href={'/'}
      >
        <House
          size={29}
          weight={pathname === `/` && !isSidebarCollapsed ? 'fill' : 'regular'}
        />
        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            pathname === `/` && !isSidebarCollapsed && 'font-bold'
          }`}
        >
          Home
        </span>
      </Link>

      <SearchButton />

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all rounded-lg duration-400 hover:bg-hover'
        href={'/explore'}
      >
        <Compass
          size={29}
          weight={
            pathname === `/explore` && !isSidebarCollapsed ? 'fill' : 'regular'
          }
        />
        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            pathname === `/explore` && !isSidebarCollapsed && 'font-bold'
          }`}
        >
          Explore
        </span>
      </Link>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all rounded-lg duration-400 hover:bg-hover'
        href={'/messages'}
      >
        <MessengerLogo
          size={29}
          weight={
            pathname === `/messages` && !isSidebarCollapsed ? 'fill' : 'regular'
          }
        />
        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            pathname === `/messages` && !isSidebarCollapsed && 'font-bold'
          }`}
        >
          Messages
        </span>
      </Link>

      <NotificationsButton />

      <NewPostButton />

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all rounded-lg duration-400 hover:bg-hover'
        href={'/omar1'}
      >
        <User size={29} weight={pathname === `/omar1` ? 'fill' : 'regular'} />
        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            pathname === `/omar1` && !isSidebarCollapsed && 'font-bold'
          }`}
        >
          Profile
        </span>
      </Link>
    </nav>
  );
};
