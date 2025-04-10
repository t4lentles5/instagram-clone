'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PostsIcon } from '@/features/profile/icons/PostsIcon';
import { ReelsIcon } from '@/features/profile/icons/ReelsIcon';
import { TaggedIcon } from '@/features/profile/icons/TaggedIcon';

interface Props {
  label: string;
  href: string;
}

export const OwnProfileNavigationLink = ({ label, href }: Props) => {
  const pathname = usePathname();

  const icons = [
    {
      icon: <PostsIcon isActive={pathname === href} />,
      label: 'Posts',
    },
    {
      icon: <ReelsIcon isActive={pathname === href} />,
      label: 'Reels',
    },
    {
      icon: <TaggedIcon isActive={pathname === href} />,
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
