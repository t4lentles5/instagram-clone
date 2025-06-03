import { getExplorePosts } from '@/features/explore/actions/get-explore-posts';
import { MasonryLayout } from '@/features/explore/components/MasonryLayout';

export default async function ExplorePage() {
  const explorePosts = await getExplorePosts();

  return (
    <main className='pt-6 md:px-4'>
      <div className='bg-ig-primary-background sticky top-0 z-50 hidden w-full pt-6 md:block'></div>
      <MasonryLayout posts={explorePosts} />
    </main>
  );
}
