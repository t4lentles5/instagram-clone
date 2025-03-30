import { PostsIcon } from '@/assets/icons/PostsIcon';
import Link from 'next/link';
import { ReelsIcon } from '../../assets/icons/ReelsIcon';
import { TaggedIcon } from '../../assets/icons/TaggedIcon';

export const UserNavigation = () => {
  return (
    <>
      <div className='grid items-center w-full grid-cols-3 md:flex md:items-center md:justify-center md:gap-16'>
        <Link
          className='flex items-center justify-center gap-2 py-3 border-t md:py-5 border-foreground'
          href={'/'}
        >
          <PostsIcon />
          <span className='hidden text-xs font-semibold uppercase md:block'>
            Posts
          </span>
        </Link>

        <Link
          className='flex items-center justify-center gap-2 py-3 border-t md:py-5 border-foreground'
          href={'/reels'}
        >
          <ReelsIcon />
          <span className='hidden text-xs font-semibold uppercase md:block'>
            Reels
          </span>
        </Link>

        <Link
          className='flex items-center justify-center gap-2 py-3 border-t md:py-5 border-foreground'
          href={'/tagged'}
        >
          <TaggedIcon />
          <span className='hidden text-xs font-semibold uppercase md:block'>
            Tagged
          </span>
        </Link>
      </div>
    </>
  );
};
