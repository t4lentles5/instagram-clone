import { getExplorePosts } from '@/features/explore/actions/get-explore-posts';
import { ExplorePostCard } from '@/features/explore/components/ExplorePostCard';

export default async function ExplorePage() {
  const explorePosts = await getExplorePosts();

  return (
    <main className='pt-6 md:px-4'>
      <div className='bg-ig-primary-background sticky top-0 z-50 hidden w-full pt-6 md:block'></div>
      <div className='mx-auto grid grid-cols-3 gap-1 md:gap-2'>
        {explorePosts.map((post) => (
          <ExplorePostCard post={post} key={post.id} />
        ))}
      </div>
    </main>
  );
}
