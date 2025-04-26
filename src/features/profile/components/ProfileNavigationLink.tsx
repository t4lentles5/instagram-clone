'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PostsLinkIcon } from '@/features/profile/icons/PostsLinkIcon';
import { TaggedLinkIcon } from '@/features/profile/icons/TaggedLinkIcon';
import { SavedLinkIcon } from '@/features/profile/icons/SavedLinkIcon';

interface Props {
  label: string;
  href: string;
}

export const ProfileNavigationLink = ({ label, href }: Props) => {
  const pathname = usePathname();

  const icons = [
    {
      icon: <PostsLinkIcon isActive={pathname === href} />,
      label: 'Posts',
    },
    {
      icon: <SavedLinkIcon isActive={pathname === href} />,
      label: 'Saved',
    },
    {
      icon: <TaggedLinkIcon isActive={pathname === href} />,
      label: 'Tagged',
    },
  ];

  return (
    <>
      <Link
        className={`${pathname === `${href}` && `border-foreground border-t`} flex items-center justify-center gap-2 py-3 md:py-5`}
        href={href}
      >
        {icons.find((item) => item.label === label)?.icon}
        <span
          className={`${pathname === `${href}` ? 'text-primary' : 'text-secondary'} hidden text-xs font-semibold uppercase md:block`}
        >
          {label}
        </span>
      </Link>
    </>
  );
};
