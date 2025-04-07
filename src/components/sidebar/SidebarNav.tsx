'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/store/ui/sidebar-store';
import { SearchButton } from '@/components/sidebar/SearchButton';
import { NotificationsButton } from '@/components/sidebar/NotificationsButton';
import { NewPostButton } from '@/components/sidebar/NewPostButton';
import { User } from '@/interfaces/user.interface';
import { HouseFillIcon } from '@/assets/icons/sidebar/sidebar-nav/HouseFillIcon';
import { HouseIcon } from '@/assets/icons/sidebar/sidebar-nav/HouseIcon';
import { ExploreIcon } from '@/assets/icons/sidebar/sidebar-nav/ExploreIcon';
import { ExploreFillIcon } from '@/assets/icons/sidebar/sidebar-nav/ExploreFillIcon';
import { ReelsIFillIcon } from '@/assets/icons/sidebar/sidebar-nav/ReelsIFillIcon';
import { ReelsIcon } from '@/assets/icons/sidebar/sidebar-nav/ReelsIcon';
import { MessengerFillIcon } from '@/assets/icons/sidebar/sidebar-nav/MessengerFillIcon';
import { MessengerIcon } from '@/assets/icons/sidebar/sidebar-nav/MessengerIcon';
import { SidebarNavItem } from '@/components/sidebar/SidebarNavItem';

interface Props {
  user: User;
}

export const SidebarNav = ({ user }: Props) => {
  const pathname = usePathname();
  const { isSidebarCollapsed } = useSidebarStore();

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

      <div className="flex h-12 items-center justify-center md:h-14 md:w-full">
        <Link
          className="hover:bg-background-hover relative flex items-center justify-start gap-4 rounded-lg p-3 md:w-full"
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
