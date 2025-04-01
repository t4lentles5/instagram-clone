'use client';

import Link from 'next/link';
import { useSidebarStore } from '@/store/ui/sidebar-store';
import { SidebarMoreOptions } from './SidebarMoreOptions';
import { SidebarNav } from './SidebarNav';
import { User } from '@/interfaces/user.interface';
import { InstagramIcon } from '@/assets/icons/InstagramIcon';
import { InstagramSmallIcon } from '@/assets/icons/sidebar/InstagramSmallIcon';

interface Props {
  user: User;
}

export const Sidebar = ({ user }: Props) => {
  const { isSidebarCollapsed } = useSidebarStore();

  return (
    <div className='sticky top-0 h-0 md:h-screen'>
      <div
        className={`${
          isSidebarCollapsed
            ? 'md:w-[72px] md:border-r md:border-separator'
            : 'md:w-full'
        } fixed md:static bottom-0 bg-background md:h-screen md:flex flex-col w-full md:pt-2 md:px-3 md:pb-[19px] transform origin-left`}
      >
        <div
          className={`${
            isSidebarCollapsed ? 'hidden ' : 'xl:block '
          } hidden px-3 pt-[33px] pb-4 mb-[14px]`}
        >
          <Link href={'/'}>
            <InstagramIcon />
          </Link>
        </div>

        <div
          className={`${
            isSidebarCollapsed ? 'block ' : 'xl:hidden '
          } hidden md:block md:w-full rounded-lg hover:bg-hover p-3 mt-4 mb-7`}
        >
          <Link href={'/'}>
            <InstagramSmallIcon />
          </Link>
        </div>

        <div className='flex flex-col justify-between h-full'>
          <SidebarNav user={user} />
          <SidebarMoreOptions />
        </div>
      </div>
    </div>
  );
};
