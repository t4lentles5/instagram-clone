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
    <nav className='flex border-t justify-evenly md:border-0 md:flex-col border-separator'>
      <div className='flex items-center justify-center h-12 md:w-full md:h-14'>
        <Link className='nav-item' href={'/'}>
          {pathname === `/` && !isSidebarCollapsed ? (
            <HouseFillIcon />
          ) : (
            <HouseIcon />
          )}

          <span
            className={`${
              isSidebarCollapsed ? 'hidden ' : 'xl:block'
            } hidden leading-5 ${
              pathname === `/` && !isSidebarCollapsed && 'font-bold'
            }`}
          >
            Home
          </span>
        </Link>
      </div>

      <SearchButton />

      <div className='flex items-center justify-center h-12 md:w-full md:h-14'>
        <Link className='nav-item' href={'/explore'}>
          {pathname === `/explore` && !isSidebarCollapsed ? (
            <ExploreFillIcon />
          ) : (
            <ExploreIcon />
          )}
          <span
            className={`${
              isSidebarCollapsed ? 'hidden ' : 'xl:block'
            } hidden leading-5 ${
              pathname === `/explore` && !isSidebarCollapsed && 'font-bold'
            }`}
          >
            Explore
          </span>
        </Link>
      </div>

      <div className='flex items-center justify-center h-12 md:w-full md:h-14'>
        <Link className='nav-item' href={'/reels'}>
          {pathname === `/reels` && !isSidebarCollapsed ? (
            <ReelsIFillIcon />
          ) : (
            <ReelsIcon />
          )}
          <span
            className={`${
              isSidebarCollapsed ? 'hidden ' : 'xl:block'
            } hidden leading-5 ${
              pathname === `/reels` && !isSidebarCollapsed && 'font-bold'
            }`}
          >
            Reels
          </span>
        </Link>
      </div>

      <div className='flex items-center justify-center h-12 md:w-full md:h-14'>
        <Link className='nav-item' href={'/messages'}>
          {pathname === `/messages` && !isSidebarCollapsed ? (
            <MessengerFillIcon />
          ) : (
            <MessengerIcon />
          )}
          <span
            className={`${
              isSidebarCollapsed ? 'hidden ' : 'xl:block'
            } hidden leading-5 ${
              pathname === `/messages` && !isSidebarCollapsed && 'font-bold'
            }`}
          >
            Messages
          </span>
        </Link>
      </div>

      <NotificationsButton />

      <NewPostButton />

      <div className='flex items-center justify-center h-12 md:w-full md:h-14'>
        <Link
          className='relative flex items-center nav-item'
          href={`/${user.username}`}
        >
          <div className='relative'>
            {pathname === `/${user.username}` && (
              <div className='absolute top-0 left-0 w-7 h-7 border-2 border-foreground rounded-full translate-x-[-2px] translate-y-[-2px]'></div>
            )}
            <img
              src={user.profile_photo}
              alt='user profile photo'
              className='object-contain w-6 h-6 rounded-full'
            />
          </div>
          <span
            className={`${
              isSidebarCollapsed ? 'hidden ' : 'xl:block'
            } hidden leading-5 ${
              pathname === `/${user.username}` &&
              !isSidebarCollapsed &&
              'font-bold'
            }`}
          >
            Profile
          </span>
        </Link>
      </div>
    </nav>
  );
};
