import Link from 'next/link';

import { getPostsByUsername } from '@/actions/user/get-posts-by-username';

import { CarouselProfilePostIcon } from '@/features/profile/icons/CarouselProfilePostIcon';
import { CommentsProfilePostIcon } from '@/features/profile/icons/CommentsProfilePostIcon';
import { CameraCircleIcon } from '@/features/profile/icons/CameraCircleIcon';
import { LikesProfilePostIcon } from '@/features/profile/icons/LikesProfilePostIcon';

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
                src={post.PostImages[0].imageUrl}
                alt=''
                className='aspect-3/4 object-cover'
              />

              {post.PostImages.length > 1 && (
                <div className='absolute top-2 right-2 text-white'>
                  <CarouselProfilePostIcon />
                </div>
              )}

              <div className='bg-post-image-overlay invisible absolute top-0 left-0 h-full w-full opacity-0 group-hover:visible group-hover:opacity-100'>
                <div className='flex h-full items-center justify-center gap-8 text-white'>
                  <span className='flex items-center justify-center'>
                    <span className='mt-0.5 mr-[7px]'>
                      <LikesProfilePostIcon />
                    </span>
                    <span className='text-base leading-5 font-bold'>
                      {post.likes.length}
                    </span>
                  </span>

                  <span className='flex items-center justify-center'>
                    <span className='mt-0.5 mr-[7px]'>
                      <CommentsProfilePostIcon />
                    </span>
                    <span className='text-base leading-5 font-bold'>10</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='flex h-full w-full flex-col items-center justify-center gap-5'>
          <CameraCircleIcon />
          <p className='mt-4 text-center text-3xl font-bold'>Share Photos</p>

          <p className='text-sm font-normal'>
            When you share photos, they will appear on your profile.
          </p>
          <button className='text-blue text-sm font-normal'>
            Share your first photo
          </button>
        </div>
      )}
    </>
  );
}
