import Link from 'next/link';

import { getPostsByUsername } from '@/features/profile/actions/get-posts-by-username';

import { NoPosts } from '@/features/posts/components/post/NoPosts';

import { CommentIcon, HeartIcon } from '@/core/shared/icons';
import { CarouselProfilePostIcon } from '@/features/profile/icons/CarouselProfilePostIcon';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function PostsPage({ params }: Props) {
  const { username } = await params;
  const posts = await getPostsByUsername(username);

  return (
    <>
      {posts.length ? (
        <div className='grid w-full grid-cols-3 gap-1'>
          {posts.map((post) => (
            <Link
              href={`/p/${post.id}`}
              key={post.id}
              scroll={false}
              className='group relative'
            >
              <img
                src={post.postImages[0].imageUrl}
                alt=''
                className='aspect-3/4 object-cover'
              />

              {post.postImages.length > 1 && (
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
                      {post.likes.length}
                    </span>
                  </span>

                  <span className='flex items-center justify-center'>
                    <span className='mt-0.5 mr-[7px]'>
                      <CommentIcon type={'comments'} size={19} />
                    </span>
                    <span className='text-base leading-5 font-bold'>
                      {post.comments.length}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <NoPosts />
      )}
    </>
  );
}
