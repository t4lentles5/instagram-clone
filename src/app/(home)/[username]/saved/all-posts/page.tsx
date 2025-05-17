import Link from 'next/link';

import { getAllSavedPosts } from '@/features/profile/actions/get-all-saved-posts';
import { CarouselProfilePostIcon } from '@/features/profile/icons/CarouselProfilePostIcon';
import { CommentIcon, HeartIcon } from '@/core/shared/icons';
import { LeftChevron } from '@/features/posts/icons';

type Params = Promise<{ username: string }>;

export default async function AllPostsPage({ params }: { params: Params }) {
  const { username } = await params;

  const savedPosts = await getAllSavedPosts();

  return (
    <main>
      <Link
        href={`/${username}/saved`}
        className='text-ig-secondary-text active:text-ig-secondary-text-pressed mb-4 flex items-center gap-1'
      >
        <span>
          <LeftChevron />
        </span>
        <span className='text-sm font-semibold'>Saved</span>
      </Link>
      <h3 className='ml-4 text-xl'>All posts</h3>

      <section className='grid w-full grid-cols-3 gap-1'>
        {savedPosts.map((post) => (
          <Link
            href={`/p/${post.post.id}`}
            key={post.id}
            scroll={false}
            className='group relative'
          >
            <img
              src={post.post.postImages[0].imageUrl}
              alt=''
              className='aspect-3/4 object-cover'
            />

            {post.post.postImages.length > 1 && (
              <div className='text-web-always-white absolute top-2 right-2'>
                <CarouselProfilePostIcon />
              </div>
            )}

            <div className='bg-ig-image-overlay active:bg-ig-image-overlay-pressed invisible absolute top-0 left-0 h-full w-full opacity-0 group-hover:visible group-hover:opacity-100'>
              <div className='text-web-always-white active:text-web-always-white/70 flex h-full items-center justify-center gap-8'>
                <span className='flex items-center justify-center'>
                  <span className='mt-0.5 mr-[7px]'>
                    <HeartIcon type={'likes'} size={19} />
                  </span>
                  <span className='text-base leading-5 font-bold'>
                    {post.post._count.likes}
                  </span>
                </span>

                <span className='flex items-center justify-center'>
                  <span className='mt-0.5 mr-[7px]'>
                    <CommentIcon type={'comments'} size={19} />
                  </span>
                  <span className='text-base leading-5 font-bold'>
                    {post.post._count.comments}
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
