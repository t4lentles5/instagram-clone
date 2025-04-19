'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ProfilePhoto } from '@/components/ui/ProfilePhoto';

import { formatPostDate } from '@/utils/format-post-date';
import { getExactDate } from '@/utils/get-exact-date';

import { XIcon } from '@/components/icons/XIcon';
import { MoreOptions24 } from '@/features/home/post/icons/MoreOptions24';
import { LikeIcon } from '@/features/home/post/icons/LikeIcon';
import { CommentIcon } from '@/features/home/post/icons/CommentIcon';
import { SaveIcon } from '@/features/home/post/icons/SaveIcon';
import { ShareIcon } from '@/features/home/post/icons/ShareIcon';
import { EmojiIcon } from '@/features/home/post/icons/EmojiIcon';
import { PostCarousel } from '@/features/home/post/components/PostCarousel';
import { getAspectClass } from '@/utils/get-aspect-class';
import { BackIcon } from '@/features/home/post/icons/BackIcon';
import { NextIcon } from '@/features/home/post/icons/NextIcon';
import { Post } from '@/interfaces/post.interface';

interface Props {
  posts: Post[];
  currentPostId: string;
}

export const PostModal = ({ posts, currentPostId }: Props) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(() =>
    posts.findIndex((p) => p.id === currentPostId),
  );
  const goToPost = (index: number) => {
    if (index >= 0 && index < posts.length) {
      setCurrentIndex(index);
      const nextPost = posts[index];

      router.replace(`/p/${nextPost.id}`);
    }
  };

  useEffect(() => {
    if (currentIndex + 1 < posts.length) {
      router.prefetch(`/p/${posts[currentIndex + 1].id}`);
    }
    if (currentIndex - 1 >= 0) {
      router.prefetch(`/p/${posts[currentIndex - 1].id}`);
    }
  }, [currentIndex]);

  const post = posts[currentIndex];

  const { aspect_ratio, first_image_dimensions } = post;

  const aspect_ratio_image = getAspectClass(
    aspect_ratio,
    first_image_dimensions!,
  );

  useEffect(() => {
    const originalStyles = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const scrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.paddingRight = originalStyles.paddingRight;
      document.body.style.position = originalStyles.position;
      document.body.style.top = originalStyles.top;
      document.body.style.width = originalStyles.width;

      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <>
      <div
        className='bg-background-overlay fixed inset-0 z-50 flex items-center justify-center'
        onClick={() => router.back()}
      >
        <button
          onClick={(e) => {
            router.back();
            e.stopPropagation();
          }}
          className='absolute top-[10px] right-[10px] cursor-pointer p-2'
        >
          <XIcon />
        </button>

        {posts.length > 1 && (
          <>
            {currentIndex !== 0 && (
              <button
                onClick={(e) => {
                  goToPost(currentIndex - 1);
                  e.stopPropagation();
                }}
                className='absolute top-1/2 left-3 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-[6px] text-black'
              >
                <BackIcon />
              </button>
            )}
            {currentIndex !== posts.length - 1 && (
              <button
                onClick={(e) => {
                  goToPost(currentIndex + 1);
                  e.stopPropagation();
                }}
                className='absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-[6px] text-black'
              >
                <NextIcon />
              </button>
            )}
          </>
        )}

        <div
          className='bg-background flex h-11/12 w-7/9 xl:w-8/10'
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className='border-popover relative max-w-[687px] items-center overflow-hidden border-r bg-black'
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
                className='disabled:text-secondary text-primary ml-2 text-sm font-semibold'
                disabled
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
