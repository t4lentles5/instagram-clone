'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebar/sidebar-store';

interface Props {
  icon: ReactNode;
  iconFill: ReactNode;
  label: string;
  href: string;
}

export const SidebarNavItem = ({ icon, iconFill, label, href }: Props) => {
  const pathname = usePathname();
  const { isSidebarCollapsed } = useSidebarStore();

  return (
    <>
      <div className="flex h-12 items-center justify-center md:h-14 md:w-full">
        <Link
          className="hover:bg-background-hover flex items-center justify-start gap-4 rounded-lg p-3 md:w-full"
          href={href}
        >
          {pathname === href && !isSidebarCollapsed ? iconFill : icon}

          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${
              pathname === href && !isSidebarCollapsed && 'font-bold'
            }`}
          >
            {label}
          </span>
        </Link>
      </div>
    </>
  );
};
