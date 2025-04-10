import { ExploreFillIcon } from '@/assets/icons/sidebar/sidebar-nav/ExploreFillIcon';
import { ExploreIcon } from '@/assets/icons/sidebar/sidebar-nav/ExploreIcon';
import { HouseFillIcon } from '@/assets/icons/sidebar/sidebar-nav/HouseFillIcon';
import { HouseIcon } from '@/assets/icons/sidebar/sidebar-nav/HouseIcon';
import { MessengerFillIcon } from '@/assets/icons/sidebar/sidebar-nav/MessengerFillIcon';
import { MessengerIcon } from '@/assets/icons/sidebar/sidebar-nav/MessengerIcon';
import { NotificationsButton } from '@/features/home/sidebar/components/NotificationsButton';
import { ReelsIcon } from '@/assets/icons/sidebar/sidebar-nav/ReelsIcon';
import { ReelsIFillIcon } from '@/assets/icons/sidebar/sidebar-nav/ReelsIFillIcon';
import { SearchButton } from '@/features/home/sidebar/components/SearchButton';
import { SidebarNavItem } from '@/features/home/sidebar/components/SidebarNavItem';
import { User } from '@/interfaces/user.interface';
import { NewPostButton } from '@/features/home/sidebar/components/NewPostButton';
import { SidebarNavItemProfile } from '@/features/home/sidebar/components/SidebarNavItemProfile';

interface Props {
  user: User;
}

export const SidebarNav = ({ user }: Props) => {
  return (
    <nav className="border-border flex justify-evenly border-t md:flex-col md:border-0">
      <SidebarNavItem
        icon={<HouseIcon />}
        iconFill={<HouseFillIcon />}
        label={'Home'}
        href="/"
      />

      <SearchButton />

      <SidebarNavItem
        icon={<ExploreIcon />}
        iconFill={<ExploreFillIcon />}
        label={'Explore'}
        href={'/explore'}
      />

      <SidebarNavItem
        icon={<ReelsIcon />}
        iconFill={<ReelsIFillIcon />}
        label={'Reels'}
        href={'/reels'}
      />

      <SidebarNavItem
        icon={<MessengerIcon />}
        iconFill={<MessengerFillIcon />}
        label={'Messages'}
        href={'/messages'}
      />

      <NotificationsButton />

      <NewPostButton />

      <SidebarNavItemProfile user={user} />
    </nav>
  );
};
