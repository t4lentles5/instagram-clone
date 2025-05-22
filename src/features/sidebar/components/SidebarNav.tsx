import { NotificationsButton } from '@/features/sidebar/components/NotificationsButton';
import { SearchButton } from '@/features/sidebar/components/SearchButton';
import { SidebarNavItem } from '@/features/sidebar/components/SidebarNavItem';
import { NewPostButton } from '@/features/sidebar/components/NewPostButton';
import { SidebarNavItemProfile } from '@/features/sidebar/components/SidebarNavItemProfile';

import {
  ExploreSidebarIcon,
  HomeSidebarIcon,
  MessengerSidebarIcon,
  ReelsSidebarIcon,
} from '@/features/sidebar/icons';
import Link from 'next/link';
import { SearchSidebarIcon } from '@/features/sidebar/icons';

export const SidebarNav = () => {
  return (
    <nav className='border-ig-separator bg-ig-primary-background flex justify-evenly border-t md:flex-col md:border-0'>
      <SidebarNavItem icon={HomeSidebarIcon} label='Home' href='/' />

      <SearchButton />

      <Link
        href='/explore'
        className='flex items-center justify-center md:hidden'
      >
        <SearchSidebarIcon />
      </Link>

      <div className='hidden md:flex'>
        <SidebarNavItem
          icon={ExploreSidebarIcon}
          label='Explore'
          href='/explore'
        />
      </div>

      <SidebarNavItem icon={ReelsSidebarIcon} label='Reels' href='/reels' />

      <SidebarNavItem
        icon={MessengerSidebarIcon}
        label='Messages'
        href='/messages'
      />

      <NotificationsButton />

      <NewPostButton />

      <SidebarNavItemProfile />
    </nav>
  );
};
