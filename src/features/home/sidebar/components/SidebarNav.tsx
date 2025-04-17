import { User } from '@/interfaces/user.interface';

import { NotificationsButton } from '@/features/home/sidebar/components/NotificationsButton';
import { SearchButton } from '@/features/home/sidebar/components/SearchButton';
import { SidebarNavItem } from '@/features/home/sidebar/components/SidebarNavItem';
import { NewPostButton } from '@/features/home/sidebar/components/NewPostButton';
import { SidebarNavItemProfile } from '@/features/home/sidebar/components/SidebarNavItemProfile';

import { ExploreSidebarIcon } from '@/features/home/sidebar/icons/ExploreSidebarIcon';
import { ReelsSidebarIcon } from '@/components/icons/ReelsSidebarIcon';
import { MessengerSidebarIcon } from '@/features/home/sidebar/icons/MessengerSidebarIcon';
import { HomeSidebarIcon } from '@/features/home/sidebar/icons/HomeSidebarIcon';

interface Props {
  user: User;
}

export const SidebarNav = ({ user }: Props) => {
  return (
    <nav className='border-border flex justify-evenly border-t md:flex-col md:border-0'>
      <SidebarNavItem icon={HomeSidebarIcon} label='Home' href='/' />

      <SearchButton />

      <SidebarNavItem
        icon={ExploreSidebarIcon}
        label='Explore'
        href='/explore'
      />

      <SidebarNavItem icon={ReelsSidebarIcon} label='Reels' href='/reels' />

      <SidebarNavItem
        icon={MessengerSidebarIcon}
        label='Messages'
        href='/messages'
      />

      <NotificationsButton />

      <NewPostButton />

      <SidebarNavItemProfile user={user} />
    </nav>
  );
};
