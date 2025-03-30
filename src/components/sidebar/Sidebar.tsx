'use client';

import Link from 'next/link';
import { useSidebarStore } from '@/store/ui/sidebar-store';
import { SidebarMoreOptions } from './SidebarMoreOptions';
import { SidebarNav } from './SidebarNav';
import { User } from '@/interfaces/user.interface';
import { InstagramIcon } from '@/assets/icons/InstagramIcon';
import { InstagramSmallIcon } from '@/assets/icons/InstagramSmallIcon';

interface Props {
  user: User;
}

export const Sidebar = ({ user }: Props) => {
  const { isSidebarCollapsed } = useSidebarStore();

  return (
    <div
      className={`${
        isSidebarCollapsed ? 'md:w-[72px]' : 'md:w-full'
      } flex flex-col w-screen md:h-screen gap-4 md:p-2 border-t md:border-r border-separator transform origin-left -transform `}
    >
      <Link href={'/'} className='hidden w-full h-20 p-3 mt-3 md:block '>
        <InstagramIcon isSidebarCollapsed={isSidebarCollapsed} />

        <InstagramSmallIcon isSidebarCollapsed={isSidebarCollapsed} />
      </Link>
      <div className='flex flex-col justify-between h-full'>
        <SidebarNav user={user} />
        <SidebarMoreOptions />
      </div>
    </div>
  );
};
