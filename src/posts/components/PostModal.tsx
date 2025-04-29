'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { PostCarousel } from '@/posts/components/PostCarousel';
import { LikeButton } from '@/posts/components/LikeButton';
import { CommentForm } from '@/features/profile/post/components/CommentForm';
import { PostComments } from '@/posts/components/PostComments';
import { ProfilePhoto } from '@/shared/components/ProfilePhoto';

import { formatPostDate } from '@/utils/format-post-date';
import { getAspectClass } from '@/utils/get-aspect-class';
import { getExactDate } from '@/utils/get-exact-date';
import { useUserStore } from '@/store/user/user-store';

import { useLikesModal } from '@/posts/hooks/useLikesModal';
import { likePost } from '@/actions/post/like-post';

import { Post } from '@/interfaces/post.interface';

import {
  CommentIcon,
  EmojiIcon,
  MoreOptionsIcon,
  SaveIcon,
  ShareIcon,
  XIcon,
} from '@/shared/icons';

interface Props {
  post: Post;
}

export const PostModal = ({ post }: Props) => {
  const { userId } = useUserStore();
  const { openModal, Modal } = useLikesModal();
  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);

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

  const hasLiked = post.likes.some((like) => like.user.id === userId);

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

        <div
          className='flex h-11/12 max-w-10/12 items-center justify-center'
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={` ${post.aspect_ratio === 'video' && 'aspect-square'} border-border relative h-full w-full max-w-[687px] overflow-hidden border-r bg-black`}
            style={{ aspectRatio: aspect_ratio_image }}
            onDoubleClick={() => {
              if (!hasLiked) {
                likePost(post.id, userId);
              }
            }}
          >
            <PostCarousel images={post.postImages.map((img) => img.imageUrl)} />
          </div>

          <div className='bg-background flex h-full max-w-[500px] min-w-[400px] grow flex-col'>
            <section className='border-border flex items-center justify-between rounded-sm border-b'>
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
                  <MoreOptionsIcon />
                </div>
              </div>
            </section>

            <PostComments
              comments={post.comments}
              textareaRef={textareaRef}
              setReplyToCommentId={setReplyToCommentId}
              postCaption={post.caption}
              profile_photo={post.author.profile_photo}
              username={post.author.username}
              postCreatedAt={post.createdAt}
            />

            <div className='border-border border-b'>
              <section className='flex justify-between px-4 py-[6px]'>
                <div className='flex'>
                  <LikeButton post={post} userId={userId} />
                  <button
                    className='p-2'
                    onClick={() => {
                      textareaRef.current?.focus();
                    }}
                  >
                    <CommentIcon type={'comment'} size={24} />
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
                  <div>
                    <button
                      onClick={() => openModal(post.likes)}
                      className='cursor-pointer text-sm leading-[18px] font-semibold'
                    >
                      {post.likes.length}{' '}
                      {post.likes.length <= 1 ? 'like' : 'likes'}
                    </button>

                    {Modal}
                  </div>
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
                <EmojiIcon size={24} />
              </button>

              <CommentForm
                postId={post.id}
                userId={userId}
                ref={textareaRef}
                replyToCommentId={replyToCommentId}
                setReplyToCommentId={setReplyToCommentId}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
