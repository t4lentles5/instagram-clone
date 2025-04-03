import Link from 'next/link';
import { PostsIcon } from '@/assets/icons/PostsIcon';
import { ReelsIcon } from '@/assets/icons/ReelsIcon';
import { TaggedIcon } from '@/assets/icons/TaggedIcon';

export const UserNavigation = () => {
  return (
    <>
      <div className="grid w-full grid-cols-3 items-center md:flex md:items-center md:justify-center md:gap-16">
        <Link
          className="border-foreground flex items-center justify-center gap-2 border-t py-3 md:py-5"
          href={'/'}
        >
          <PostsIcon />
          <span className="hidden text-xs font-semibold uppercase md:block">
            Posts
          </span>
        </Link>

        <Link
          className="border-foreground flex items-center justify-center gap-2 border-t py-3 md:py-5"
          href={'/reels'}
        >
          <ReelsIcon />
          <span className="hidden text-xs font-semibold uppercase md:block">
            Reels
          </span>
        </Link>

        <Link
          className="border-foreground flex items-center justify-center gap-2 border-t py-3 md:py-5"
          href={'/tagged'}
        >
          <TaggedIcon />
          <span className="hidden text-xs font-semibold uppercase md:block">
            Tagged
          </span>
        </Link>
      </div>
    </>
  );
};
