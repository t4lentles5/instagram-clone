'use client';

import Link from 'next/link';
import { useSidebarStore } from '@/store/ui/sidebar-store';
import { SidebarMoreOptions } from '@/components/sidebar/SidebarMoreOptions';
import { SidebarNav } from '@/components/sidebar/SidebarNav';
import { User } from '@/interfaces/user.interface';
import { InstagramIcon } from '@/assets/icons/InstagramIcon';
import { InstagramSmallIcon } from '@/assets/icons/sidebar/InstagramSmallIcon';

interface Props {
  user: User;
}

export const Sidebar = ({ user }: Props) => {
  const { isSidebarCollapsed } = useSidebarStore();

  return (
    <div className="md:border-border sticky top-0 h-0 md:h-screen md:border-r">
      <div
        className={`${
          isSidebarCollapsed ? 'md:w-[73px]' : 'md:w-full'
        } bg-background fixed bottom-0 w-full origin-left transform flex-col md:static md:flex md:h-screen md:px-3 md:pt-2 md:pb-[19px]`}
      >
        <div
          className={`${
            isSidebarCollapsed ? 'hidden' : 'xl:block'
          } mb-[14px] hidden px-3 pt-[33px] pb-4`}
        >
          <Link href={'/'}>
            <InstagramIcon />
          </Link>
        </div>

        <div
          className={`${
            isSidebarCollapsed ? 'block' : 'xl:hidden'
          } hover:bg-background-hover mt-4 mb-7 hidden rounded-lg p-3 md:block md:w-full`}
        >
          <Link href={'/'}>
            <InstagramSmallIcon />
          </Link>
        </div>

        <div className="flex h-full flex-col justify-between">
          <SidebarNav user={user} />
          <SidebarMoreOptions />
        </div>
      </div>
    </div>
  );
};
