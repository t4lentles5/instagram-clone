import { ProfileNavigationLink } from './ProfileNavigationLink';

interface Props {
  username: string;
  isAuthenticatedUser: boolean;
}

export const ProfileNavigation = ({ username, isAuthenticatedUser }: Props) => {
  const Items = [
    { label: 'Posts', href: `/${username}` },
    isAuthenticatedUser
      ? { label: 'Saved', href: `/${username}/saved` }
      : { label: 'Reels', href: `/${username}/reels` },
    { label: 'Tagged', href: `/${username}/tagged` },
  ];

  return (
    <div className='grid w-full grid-cols-3 items-center md:flex md:items-center md:justify-center md:gap-16'>
      {Items.map((item) => (
        <ProfileNavigationLink key={item.label} {...item} />
      ))}
    </div>
  );
};
