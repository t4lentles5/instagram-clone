import { UserNavigationLink } from '@/components/user/UserNavigationLink';
import { ReelsIcon } from '@/assets/icons/ReelsIcon';
import { TaggedIcon } from '@/assets/icons/TaggedIcon';
import { PostsIcon } from '@/assets/icons/PostsIcon';

interface Props {
  username: string;
}

export const UserNavigation = ({ username }: Props) => {
  const Items = [
    { icon: <PostsIcon />, label: 'Posts', href: `/${username}` },
    { icon: <ReelsIcon />, label: 'Reels', href: `/${username}/reels` },
    { icon: <TaggedIcon />, label: 'Tagged', href: `/${username}/tagged` },
  ];

  return (
    <>
      <div className="grid w-full grid-cols-3 items-center md:flex md:items-center md:justify-center md:gap-16">
        {Items.map((item) => (
          <UserNavigationLink key={item.label} {...item} />
        ))}
      </div>
    </>
  );
};
