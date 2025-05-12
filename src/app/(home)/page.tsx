import { getRecommendedUsers } from '@/features/profile/actions/get-recommended-users';
import { getPosts } from '@/features/posts/actions/get-posts';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';
import { getStories } from '@/features/stories/actions/get-stories';

import { SwitchUser } from '@/features/suggestions/components/SwitchUser';
import { Footer } from '@/core/shared/components/Footer';
import { SuggestedUsers } from '@/features/suggestions/components/SuggestedUsers';
import { UserStories } from '@/features/stories/components/UserStories';
import { PostCard } from '@/features/posts/components/post/PostCard';

export default async function HomePage() {
  const user = await getAuthenticatedUser();
  const users = await getRecommendedUsers(user.id);
  const stories = await getStories(user.id);
  const posts = await getPosts();

  return (
    <div className='flex h-full w-full items-center justify-center'>
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
  );
}
