import { OwnProfileNavigationLink } from '@/profile/OwnProfile/components/OwnProfileNavigationLink';

interface Props {
  username: string;
}

export const OwnProfileNavigation = ({ username }: Props) => {
  const Items = [
    { label: 'Posts', href: `/${username}` },
    { label: 'Reels', href: `/${username}/reels` },
    { label: 'Tagged', href: `/${username}/tagged` },
  ];

  return (
    <>
      <div className="grid w-full grid-cols-3 items-center md:flex md:items-center md:justify-center md:gap-16">
        {Items.map((item) => (
          <OwnProfileNavigationLink key={item.label} {...item} />
        ))}
      </div>
    </>
  );
};
