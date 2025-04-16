import { NotificationsButton } from '@/features/home/sidebar/components/NotificationsButton';
import { SearchButton } from '@/features/home/sidebar/components/SearchButton';
import { SidebarNavItem } from '@/features/home/sidebar/components/SidebarNavItem';
import { User } from '@/interfaces/user.interface';
import { NewPostButton } from '@/features/home/sidebar/components/NewPostButton';
import { SidebarNavItemProfile } from '@/features/home/sidebar/components/SidebarNavItemProfile';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { ExploreIcon } from '@/components/icons/ExploreIcon';
import { ReelsIcon } from '@/components/icons/ReelsIcon';
import { MessengerIcon } from '@/components/icons/MessengerIcon';

interface Props {
  user: User;
}

export const SidebarNav = ({ user }: Props) => {
  return (
    <nav className='border-border flex justify-evenly border-t md:flex-col md:border-0'>
      <SidebarNavItem icon={HomeIcon} label='Home' href='/' />
      <SearchButton />
      <SidebarNavItem icon={ExploreIcon} label='Explore' href='/explore' />
      <SidebarNavItem icon={ReelsIcon} label='Reels' href='/reels' />
      <SidebarNavItem icon={MessengerIcon} label='Messages' href='/messages' />
      <NotificationsButton />
      <NewPostButton />
      <SidebarNavItemProfile user={user} />
    </nav>
  );
};
