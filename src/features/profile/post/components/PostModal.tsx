'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { PostCarousel } from '@/features/home/post/components/PostCarousel';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { LikeButton } from '@/features/home/post/components/LikeButton';
import { CommentForm } from './CommentForm';

import { formatPostDate } from '@/utils/format-post-date';
import { getAspectClass } from '@/utils/get-aspect-class';
import { getExactDate } from '@/utils/get-exact-date';
import { formatDate } from '@/utils/format-date';

import { likePost } from '@/actions/post/like-post';

import { Post } from '@/interfaces/post.interface';

import { XIcon } from '@/components/icons/XIcon';
import { CommentIcon } from '@/features/home/post/icons/CommentIcon';
import { SaveIcon } from '@/features/home/post/icons/SaveIcon';
import { MoreOptions24 } from '@/features/home/post/icons/MoreOptions24';
import { ShareIcon } from '@/features/home/post/icons/ShareIcon';
import { EmojiIcon } from '@/features/home/post/icons/EmojiIcon';
import { BackIcon } from '@/features/home/post/icons/BackIcon';
import { NextIcon } from '@/features/home/post/icons/NextIcon';
import { CommentLikeIcon } from '@/features/profile/icons/CommentLikeIcon';

interface Props {
  posts: Post[];
  currentPostId: string;
  userId: string;
}

export const PostModal = ({ posts, currentPostId, userId }: Props) => {
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

  const hasLiked = post.likes.some((like) => like.userId === userId);

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
          className='bg-background flex h-11/12'
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className='border-popover relative max-w-[600px] min-w-[200px] items-center overflow-hidden border-r bg-black'
            style={{ aspectRatio: aspect_ratio_image }}
            onDoubleClick={() => {
              if (!hasLiked) {
                likePost(post.id, userId);
              }
            }}
          >
            <PostCarousel images={post.PostImages.map((img) => img.imageUrl)} />
          </div>

          <div className='flex h-full max-w-[500px] min-w-[450px] grow flex-col'>
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

            {post.comments.length > 0 ? (
              <div className='border-popover scrollbar-hide grow overflow-y-scroll border-b p-4'>
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className='flex items-start justify-between pt-3'
                  >
                    <div className='flex w-full'>
                      <div className='w-[50px] shrink-0'>
                        <ProfilePhoto
                          profile_photo={comment.user.profile_photo}
                          imageSize={{ size: 'w-8' }}
                          backgroundDivSize={{ size: 'w-9' }}
                          borderDivSize={{ size: 'w-10' }}
                        />
                      </div>

                      <div className='max-w-[320px]'>
                        <p className='text-sm leading-snug break-words whitespace-pre-wrap'>
                          <span
                            onClick={() => {
                              router.back();
                              setTimeout(() => {
                                router.push(`/${comment.user.username}`);
                              }, 10);
                            }}
                            className='mr-1 font-semibold'
                          >
                            {comment.user.username}
                          </span>
                          {comment.text}
                        </p>
                        <span className='text-secondary text-xs'>
                          {formatDate(comment.createdAt.toString())}
                        </span>
                      </div>
                    </div>

                    <span className='mt-[9px] w-[24px] flex-shrink-0'>
                      <CommentLikeIcon />
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className='border-popover flex grow flex-col items-center justify-center border-b'>
                <h2 className='mb-2 text-2xl font-bold'>No comments yet.</h2>{' '}
                <span className='text-sm'>Start the conversation.</span>
              </div>
            )}

            <div className='border-popover border-b'>
              <section className='flex justify-between px-4 py-[6px]'>
                <div className='flex'>
                  <LikeButton post={post} userId={userId} />
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

              <section className='mb-4 flex flex-col px-4 text-sm'>
                {post.likes.length <= 0 ? (
                  <span className='text-sm'>
                    Be te first to{' '}
                    <button
                      className='hover:text-secondary cursor-pointer font-semibold'
                      onClick={() => likePost(post.id, userId)}
                    >
                      like this
                    </button>
                  </span>
                ) : (
                  <span className='text-sm font-semibold'>
                    {post.likes.length}{' '}
                    {post.likes.length <= 1 ? 'like' : 'likes'}
                  </span>
                )}

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

              <CommentForm postId={post.id} userId={userId} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
