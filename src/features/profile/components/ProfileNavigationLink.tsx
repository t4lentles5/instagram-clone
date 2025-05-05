'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PostsLinkIcon } from '@/features/profile/icons/PostsLinkIcon';
import { TaggedLinkIcon } from '@/features/profile/icons/TaggedLinkIcon';
import { SavedLinkIcon } from '@/features/profile/icons/SavedLinkIcon';
import { ReelsLinkIcon } from '@/features/profile/icons/ReelsLinkIcon';

interface Props {
  label: string;
  href: string;
}

export const ProfileNavigationLink = ({ label, href }: Props) => {
  const pathname = usePathname();

  const icons = [
    {
      icon: <PostsLinkIcon />,
      label: 'Posts',
    },
    {
      icon: <SavedLinkIcon />,
      label: 'Saved',
    },
    {
      icon: <ReelsLinkIcon />,
      label: 'Reels',
    },
    {
      icon: <TaggedLinkIcon />,
      label: 'Tagged',
    },
  ];

  return (
    <>
      <Link
        className={`${pathname === `${href}` ? `border-ig-primary-text active:text-ig-primary-text-pressed text-ig-primary-text border-b-2 md:border-t md:border-b-0` : 'text-ig-secondary-text active:text-ig-secondary-text-pressed'} mx-12 mb-1 flex items-center justify-center gap-2 py-3 md:mx-0 md:mb-0 md:py-5`}
        href={href}
      >
        {icons.find((item) => item.label === label)?.icon}
        <span className={`hidden text-xs font-semibold uppercase md:block`}>
          {label}
        </span>
      </Link>
    </>
  );
};
