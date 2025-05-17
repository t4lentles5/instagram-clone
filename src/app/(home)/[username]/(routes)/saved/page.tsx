import { getSavedPosts } from '@/features/profile/actions/get-saved-posts';
import Link from 'next/link';

export default async function SavedPage() {
  const savedPosts = await getSavedPosts();

  return (
    <div className='w-full px-4 lg:px-0'>
      <section className='flex items-center justify-between'>
        <span className='text-ig-secondary-text text-xs'>
          Only you can see what you&apos;ve saved
        </span>

        <button className='text-ig-primary-button active:text-ig-primary-button-pressed hover:text-ig-link cursor-pointer text-sm font-semibold transition-colors duration-200'>
          + New Collection
        </button>
      </section>

      <Link
        href='saved/all-posts'
        className='relative grid h-[300px] w-[300px] grid-cols-2 grid-rows-2 overflow-hidden rounded-sm'
      >
        <div className='absolute top-0 left-0 h-full w-full cursor-pointer bg-[linear-gradient(to_top,rgba(38,38,38,0.6),rgba(255,255,255,0))] transition-colors duration-200 hover:bg-[linear-gradient(to_top,rgba(38,38,38,0.2),rgba(255,255,255,0))] active:bg-[linear-gradient(to_top,rgba(38,38,38,0.5),rgba(255,255,255,0.5))]'>
          <h3 className='text-web-always-white translate-x-5 translate-y-[252px] text-xl'>
            All posts
          </h3>
        </div>
        {savedPosts.map((post) => (
          <img
            key={post.id}
            src={post.post.postImages[0].imageUrl}
            alt=''
            className='h-[150px] w-[150px] object-cover'
          />
        ))}
      </Link>
    </div>
  );
}
