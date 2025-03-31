'use client';

import { useSidebarStore } from '@/store/ui/sidebar-store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchButton } from './SearchButton';
import { NotificationsButton } from './NotificationsButton';
import { NewPostButton } from './NewPostButton';
import { User } from '@/interfaces/user.interface';
import { HouseFillIcon } from '@/assets/icons/sidebar/sidebar-nav/HouseFillIcon';
import { HouseIcon } from '@/assets/icons/sidebar/sidebar-nav/HouseIcon';
import { ExploreIcon } from '@/assets/icons/sidebar/sidebar-nav/ExploreIcon';
import { ExploreFillIcon } from '@/assets/icons/sidebar/sidebar-nav/ExploreFillIcon';
import { ReelsIFillIcon } from '@/assets/icons/sidebar/sidebar-nav/ReelsIFillIcon';
import { ReelsIcon } from '@/assets/icons/sidebar/sidebar-nav/ReelsIcon';
import { MessengerFillIcon } from '@/assets/icons/sidebar/sidebar-nav/MessengerFillIcon';
import { MessengerIcon } from '@/assets/icons/sidebar/sidebar-nav/MessengerIcon';

interface Props {
  user: User;
}

export const SidebarNav = ({ user }: Props) => {
  const pathname = usePathname();
  const { isSidebarCollapsed } = useSidebarStore();

  return (
    <nav className='flex justify-around md:gap-1 md:flex-col'>
      <Link className='nav-item' href={'/'}>
        {pathname === `/` && !isSidebarCollapsed ? (
          <HouseFillIcon />
        ) : (
          <HouseIcon />
        )}

        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            pathname === `/` && !isSidebarCollapsed && 'font-bold'
          }`}
        >
          Home
        </span>
      </Link>

      <SearchButton />

      <Link className='nav-item' href={'/explore'}>
        {pathname === `/explore` && !isSidebarCollapsed ? (
          <ExploreFillIcon />
        ) : (
          <ExploreIcon />
        )}
        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            pathname === `/explore` && !isSidebarCollapsed && 'font-bold'
          }`}
        >
          Explore
        </span>
      </Link>

      <Link className='nav-item' href={'/reels'}>
        {pathname === `/reels` && !isSidebarCollapsed ? (
          <ReelsIFillIcon />
        ) : (
          <ReelsIcon />
        )}
        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            pathname === `/reels` && !isSidebarCollapsed && 'font-bold'
          }`}
        >
          Reels
        </span>
      </Link>

      <Link className='nav-item' href={'/messages'}>
        {pathname === `/messages` && !isSidebarCollapsed ? (
          <MessengerFillIcon />
        ) : (
          <MessengerIcon />
        )}
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

      <Link className='nav-item' href={`/${user.username}`}>
        <div
          className={`${
            pathname === `/${user.username}` &&
            'border-2 border-foregroundSecondary rounded-full'
          }`}
        >
          <img
            src={user.profile_photo}
            alt='user profile photo'
            className='object-contain  w-6 h-6 border rounded-full border-separator'
          />
        </div>
        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            pathname === `/${user.username}` &&
            !isSidebarCollapsed &&
            'font-bold'
          }`}
        >
          Profile
        </span>
      </Link>
    </nav>
  );
};
