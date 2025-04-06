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
    <nav className="border-separator flex justify-evenly border-t md:flex-col md:border-0">
      <div className="flex h-12 items-center justify-center md:h-14 md:w-full">
        <Link
          className="hover:bg-hover flex items-center justify-start gap-4 rounded-lg p-3 md:w-full"
          href={'/'}
        >
          {pathname === `/` && !isSidebarCollapsed ? (
            <HouseFillIcon />
          ) : (
            <HouseIcon />
          )}

          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${
              pathname === `/` && !isSidebarCollapsed && 'font-bold'
            }`}
          >
            Home
          </span>
        </Link>
      </div>

      <SearchButton />

      <div className="flex h-12 items-center justify-center md:h-14 md:w-full">
        <Link
          className="hover:bg-hover flex items-center justify-start gap-4 rounded-lg p-3 md:w-full"
          href={'/explore'}
        >
          {pathname === `/explore` && !isSidebarCollapsed ? (
            <ExploreFillIcon />
          ) : (
            <ExploreIcon />
          )}
          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${
              pathname === `/explore` && !isSidebarCollapsed && 'font-bold'
            }`}
          >
            Explore
          </span>
        </Link>
      </div>

      <div className="flex h-12 items-center justify-center md:h-14 md:w-full">
        <Link
          className="hover:bg-hover flex items-center justify-start gap-4 rounded-lg p-3 md:w-full"
          href={'/reels'}
        >
          {pathname === `/reels` && !isSidebarCollapsed ? (
            <ReelsIFillIcon />
          ) : (
            <ReelsIcon />
          )}
          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${
              pathname === `/reels` && !isSidebarCollapsed && 'font-bold'
            }`}
          >
            Reels
          </span>
        </Link>
      </div>

      <div className="flex h-12 items-center justify-center md:h-14 md:w-full">
        <Link
          className="hover:bg-hover flex items-center justify-start gap-4 rounded-lg p-3 md:w-full"
          href={'/messages'}
        >
          {pathname === `/messages` && !isSidebarCollapsed ? (
            <MessengerFillIcon />
          ) : (
            <MessengerIcon />
          )}
          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
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

      <div className="flex h-12 items-center justify-center md:h-14 md:w-full">
        <Link
          className="hover:bg-hover relative flex items-center justify-start gap-4 rounded-lg p-3 md:w-full"
          href={`/${user.username}`}
        >
          <div className="relative">
            {pathname === `/${user.username}` && (
              <div className="border-foreground absolute top-0 left-0 h-7 w-7 translate-x-[-2px] translate-y-[-2px] rounded-full border-2"></div>
            )}
            <img
              src={user.profile_photo}
              alt="user profile photo"
              className="h-6 w-6 rounded-full object-contain"
            />
          </div>
          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
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
