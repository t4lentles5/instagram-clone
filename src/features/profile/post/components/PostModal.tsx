'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ProfilePhoto } from '@/components/ui/ProfilePhoto';

import { formatPostDate } from '@/utils/format-post-date';
import { getExactDate } from '@/utils/get-exact-date';

import { XIcon } from '@/components/icons/XIcon';
import { MoreOptions24 } from '@/components/icons/MoreOptions24';
import { LikeIcon } from '@/components/icons/LikeIcon';
import { CommentIcon } from '@/components/icons/CommentIcon';
import { SaveIcon } from '@/components/icons/SaveIcon';
import { ShareIcon } from '@/components/icons/ShareIcon';
import { EmojiIcon } from '@/features/home/post/icons/EmojiIcon';
import { PostCarousel } from '@/features/home/post/components/PostCarousel';
import { getAspectClass } from '@/utils/get-aspect-class';

interface Props {
  post: {
    id: string;
    caption: string | null;
    createdAt: Date;
    author: {
      username: string;
      profile_photo: string | null;
    };
    PostImages: {
      imageUrl: string;
    }[];
    likes: { postId: string; userId: string }[];
    first_image_dimensions: string | null;
    aspect_ratio: string;
  };
}

export const PostModal = ({ post }: Props) => {
  const router = useRouter();

  const { aspect_ratio, first_image_dimensions } = post;

  const aspect_ratio_image = getAspectClass(
    aspect_ratio,
    first_image_dimensions!,
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <>
      <div className='bg-background-overlay fixed inset-0 z-50 flex items-center justify-center'>
        <button
          onClick={() => router.back()}
          className='absolute top-[10px] right-[10px] cursor-pointer p-2'
        >
          <XIcon />
        </button>
        <div className='bg-background flex h-11/12 w-7/9 xl:w-9/10'>
          <div
            className='border-popover relative max-w-[687px] items-center border-r bg-black'
            style={{ aspectRatio: aspect_ratio_image }}
          >
            <PostCarousel images={post.PostImages.map((img) => img.imageUrl)} />
          </div>

          <div className='flex h-full grow flex-col'>
            <section className='border-popover flex items-center justify-between rounded-sm border-b'>
              <div className='flex grow items-center py-[14px] pr-1 pl-4'>
                <ProfilePhoto
                  profile_photo={post.author.profile_photo}
                  imageSize={{
                    size: 'w-8',
                  }}
                  backgroundDivSize={{
                    size: 'w-9',
                  }}
                  borderDivSize={{
                    size: 'w-10',
                  }}
                />
                <span className='ml-[14px] text-sm font-semibold'>
                  {post.author.username}
                </span>
              </div>
              <div className='pr-2'>
                <div className='p-2'>
                  <MoreOptions24 />
                </div>
              </div>
            </section>

            <div className='border-popover flex grow flex-col items-center justify-center border-b'>
              <h2 className='mb-2 text-2xl font-bold'>No comments yet.</h2>{' '}
              <span className='text-sm'>Start the conversation.</span>
            </div>

            <div className='border-popover border-b'>
              <section className='flex justify-between px-4 py-[6px]'>
                <div className='flex'>
                  <button className='py-2 pr-2'>
                    <LikeIcon />
                  </button>
                  <button className='p-2'>
                    <CommentIcon />
                  </button>
                  <button className='p-2'>
                    <ShareIcon />
                  </button>
                </div>
                <button className='py-2 pl-2'>
                  <SaveIcon />
                </button>
              </section>

              <section className='mb-4 flex flex-col px-4'>
                <span className='text-sm'>
                  {post.likes.length}{' '}
                  <span className='font-semibold'>likes</span>
                </span>
                <time
                  className='text-secondary text-xs'
                  title={getExactDate(post.createdAt.toString())}
                >
                  {formatPostDate(post.createdAt)}
                </time>
              </section>
            </div>

            <section className='flex py-[6px] pr-4'>
              <button className='px-4 py-2'>
                <EmojiIcon />
              </button>

              <form className='flex grow items-center'>
                <textarea
                  name='comment'
                  id='comment'
                  placeholder='Add a comment...'
                  rows={1}
                  className='max-h-[80px] min-h-[18px] w-full flex-1 resize-none overflow-y-auto border-none bg-transparent text-sm outline-none placeholder:text-gray-400 focus:ring-0'
                  onInput={(e) => {
                    e.currentTarget.style.height = 'auto';
                    e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 80)}px`;
                  }}
                />
              </form>

              <button
                type='submit'
                className='ml-2 text-sm font-semibold text-blue-500 opacity-0 transition-opacity duration-200 disabled:opacity-50'
                disabled
                aria-hidden='true'
              >
                Post
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
