'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  icon: JSX.Element;
  label: string;
  href: string;
}

export const UserNavigationLink = ({ icon, label, href }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        className={`${pathname === `${href}` && `border-foreground border-t`} flex items-center justify-center gap-2 py-3 md:py-5`}
        href={href}
      >
        {icon}
        <span className="hidden text-xs font-semibold uppercase md:block">
          {label}
        </span>
      </Link>
    </>
  );
};
