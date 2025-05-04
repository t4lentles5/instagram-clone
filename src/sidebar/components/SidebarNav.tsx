import { User } from '@/shared/interfaces/user.interface';

import { NotificationsButton } from './NotificationsButton';
import { SearchButton } from './SearchButton';
import { SidebarNavItem } from './SidebarNavItem';
import { NewPostButton } from './NewPostButton';
import { SidebarNavItemProfile } from './SidebarNavItemProfile';

import {
  ExploreSidebarIcon,
  HomeSidebarIcon,
  MessengerSidebarIcon,
  ReelsSidebarIcon,
} from '@/sidebar/icons';

interface Props {
  user: User;
}

export const SidebarNav = ({ user }: Props) => {
  return (
    <nav className='border-ig-separator bg-ig-primary-background flex justify-evenly border-t md:flex-col md:border-0'>
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
