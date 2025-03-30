'use client';

import { useSidebarStore } from '@/store/ui/sidebar-store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchButton } from './SearchButton';
import { NotificationsButton } from './NotificationsButton';
import { NewPostButton } from './NewPostButton';
import { User } from '@/interfaces/user.interface';
import { HouseFillIcon } from '@/assets/icons/Sidebar/HouseFillIcon';
import { HouseIcon } from '@/assets/icons/Sidebar/HouseIcon';
import { ExploreIcon } from '@/assets/icons/Sidebar/ExploreIcon';
import { ExploreFillIcon } from '@/assets/icons/Sidebar/ExploreFillIcon';
import { ReelsIFillIcon } from '@/assets/icons/Sidebar/ReelsIFillIcon';
import { ReelsIcon } from '@/assets/icons/Sidebar/ReelsIcon';
import { MessengerFillIcon } from '@/assets/icons/Sidebar/MessengerFillIcon';
import { MessengerIcon } from '@/assets/icons/Sidebar/MessengerIcon';

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
        <img
          src={user.profile_photo}
          alt='user profile photo'
          className='object-contain w-8 h-8 border rounded-full border-separation'
        />
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
