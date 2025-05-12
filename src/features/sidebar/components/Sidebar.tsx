'use client';

import Link from 'next/link';

import { useSidebarStore } from '@/features/sidebar/sidebar-store';

import { SidebarMoreOptions } from '@/features/sidebar/components/SidebarMoreOptions';
import { SidebarNav } from '@/features/sidebar/components/SidebarNav';

import { InstagramIcon, InstagramSmallIcon } from '@/features/sidebar/icons';

export const Sidebar = () => {
  const { isSidebarCollapsed } = useSidebarStore();

  return (
    <div className={`sticky top-0 z-50 h-0 md:h-screen`}>
      <div
        className={`${
          isSidebarCollapsed ? 'md:w-[73px]' : 'md:w-full'
        } md:border-ig-separator fixed bottom-0 w-full origin-left transform flex-col md:static md:flex md:h-screen md:border-r md:px-3 md:pt-2 md:pb-[19px]`}
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
          } hover:bg-ig-hover-overlay active:bg-ig-active-overlay active:text-ig-primary-text/50 mt-4 mb-7 hidden rounded-lg p-3 active:scale-95 md:block md:w-full`}
        >
          <Link href={'/'}>
            <InstagramSmallIcon />
          </Link>
        </div>

        <div className='flex h-full flex-col justify-between'>
          <SidebarNav />
          <SidebarMoreOptions />
        </div>
      </div>
    </div>
  );
};
