'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebar/sidebar-store';
import { ComponentType } from 'react';

interface Props {
  icon: ComponentType<{ isActive: boolean }>;
  label: string;
  href: string;
}

export const SidebarNavItem = ({ icon: Icon, label, href }: Props) => {
  const pathname = usePathname();
  const { isSidebarCollapsed } = useSidebarStore();

  const isActive = pathname === href && !isSidebarCollapsed;

  return (
    <div className='flex h-12 items-center justify-center md:h-14 md:w-full'>
      <Link
        href={href}
        className='hover:bg-background-hover flex items-center justify-start gap-4 rounded-lg p-3 md:w-full'
      >
        <Icon isActive={isActive} />

        <span
          className={`${
            isSidebarCollapsed ? 'hidden' : 'xl:block'
          } hidden leading-5 ${isActive && !isSidebarCollapsed && 'font-bold'}`}
        >
          {label}
        </span>
      </Link>
    </div>
  );
};
