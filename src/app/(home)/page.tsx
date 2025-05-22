import { getRecommendedUsers } from '@/features/profile/actions/get-recommended-users';
import Link from 'next/link';
import { getPosts } from '@/features/posts/actions/get-posts';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';
import { getStories } from '@/features/stories/actions/get-stories';

import { SwitchUser } from '@/features/suggestions/components/SwitchUser';
import { Footer } from '@/core/shared/components/Footer';
import { SuggestedUsers } from '@/features/suggestions/components/SuggestedUsers';
import { UserStories } from '@/features/stories/components/UserStories';
import { PostCard } from '@/features/posts/components/post/PostCard';

import { InstagramIcon, MessengerSidebarIcon } from '@/features/sidebar/icons';
import { HeartIcon } from '@/core/shared/icons';

export default async function HomePage() {
  const user = await getAuthenticatedUser();
  const users = await getRecommendedUsers(user.id);
  const stories = await getStories(user.id);
  const posts = await getPosts();

  return (
    <>
      <header className='bg-ig-primary-background border-ig-separator fixed top-0 z-50 flex h-[60px] w-full items-center justify-between border-b px-4 md:hidden'>
        <Link href={'/'}>
          <InstagramIcon />
        </Link>

        <div className='flex items-center justify-center gap-4'>
          <Link href={'/messages'}>
            <MessengerSidebarIcon />
          </Link>

          <Link href={'/notifications'}>
            <HeartIcon type={'notification'} size={24} />
          </Link>
        </div>
      </header>

      <div className='mt-[60px] flex h-full w-full items-center justify-center md:mt-0'>
        <div className='flex w-[630px] flex-col items-center pt-4'>
          <UserStories stories={stories} user={user} />
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>

        <div className='ml-16 hidden h-full w-[320px] flex-col justify-start pt-9 min-[1160px]:flex'>
          <SwitchUser user={user} />

          <SuggestedUsers users={users} />

          <Footer />
        </div>
      </div>
    </>
  );
}
