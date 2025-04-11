import { ExploreFillIcon } from '@/features/home/sidebar/icons/sidebar-nav/ExploreFillIcon';
import { ExploreIcon } from '@/features/home/sidebar/icons/sidebar-nav/ExploreIcon';
import { HouseFillIcon } from '@/features/home/sidebar/icons/sidebar-nav/HouseFillIcon';
import { HouseIcon } from '@/features/home/sidebar/icons/sidebar-nav/HouseIcon';
import { MessengerFillIcon } from '@/features/home/sidebar/icons/sidebar-nav/MessengerFillIcon';
import { MessengerIcon } from '@/features/home/sidebar/icons/sidebar-nav/MessengerIcon';
import { NotificationsButton } from '@/features/home/sidebar/components/NotificationsButton';
import { ReelsIcon } from '@/features/home/sidebar/icons/sidebar-nav/ReelsIcon';
import { ReelsIFillIcon } from '@/features/home/sidebar/icons/sidebar-nav/ReelsIFillIcon';
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
