'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { PostCarousel } from '@/features/posts/components/post/PostCarousel';
import { LikeButton } from '@/features/posts/components/likes/LikeButton';
import { CommentForm } from '@/features/posts/components/comments/CommentForm';
import { PostComments } from '@/features/posts/components/comments/PostComments';
import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { SavePost } from './SavePost';
import { LikesModalContent } from '../likes/LikesModalContent';

import { formatPostDate } from '@/features/posts/utils/format-post-date';
import { getAspectClass } from '@/features/posts/utils/get-aspect-class';
import { getExactDate } from '@/features/posts/utils/get-exact-date';

import { likePost } from '@/features/posts/actions/like-post';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

import { Post } from '@/core/shared/interfaces/post.interface';
import { useModal } from '@/core/shared/hooks/useModal';

import {
  CommentIcon,
  EmojiIcon,
  MoreOptionsIcon,
  ShareIcon,
  XIcon,
} from '@/core/shared/icons';
import { Modal } from '@/core/shared/components/Modal';

interface Props {
  post: Post;
}

export const PostModal = ({ post }: Props) => {
  const { isOpen, openModal, closeModal } = useModal();

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

  const { data: authenticatedUser } = useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: () => getAuthenticatedUser(),
    staleTime: 1000 * 60 * 10,
  });

  const router = useRouter();

  const [showReplies, setShowReplies] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);

  const { aspect_ratio, first_image_dimensions } = post;

  const aspect_ratio_image = getAspectClass(
    aspect_ratio,
    first_image_dimensions!,
  );

  const hasLiked = post.likes.some(
    (like) => like.user.id === authenticatedUser!.id,
  );

  if (!authenticatedUser) {
    return null;
  }

  return (
    <>
      <div
        className='bg-overlay-alpha-80 fixed inset-0 z-50 flex items-center justify-center'
        onClick={() => router.back()}
      >
        <button
          onClick={(e) => {
            router.back();
            e.stopPropagation();
          }}
          className='text-web-always-white absolute top-[10px] right-[10px] cursor-pointer p-2'
        >
          <XIcon size={16} />
        </button>

        <div
          className='flex h-11/12 max-w-10/12 items-center justify-center'
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={` ${post.aspect_ratio === 'video' && 'aspect-square'} border-post-separator bg-web-always-black relative h-full w-full overflow-hidden border-r`}
            style={{ aspectRatio: aspect_ratio_image }}
            onDoubleClick={() => {
              if (!hasLiked) {
                likePost(post.id, authenticatedUser.id);
              }
            }}
          >
            <PostCarousel images={post.postImages.map((img) => img.imageUrl)} />
          </div>

          <div className='bg-ig-primary-background flex h-full max-w-[500px] min-w-[400px] grow flex-col rounded-r-sm'>
            <section className='border-post-separator flex items-center justify-between rounded-sm border-b'>
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
                <Link
                  href={`/${post.author.username}`}
                  className='text-ig-secondary-button hover:text-ig-secondary-button-hover active:text-ig-secondary-button-pressed ml-[14px] text-sm font-semibold'
                >
                  {post.author.username}
                </Link>
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
              showReplies={showReplies}
              setShowReplies={setShowReplies}
            />

            <div className='border-post-separator border-b'>
              <section className='flex justify-between px-4 py-[6px]'>
                <div className='flex'>
                  <LikeButton post={post} userId={authenticatedUser.id} />
                  <button
                    className='hover:text-ig-secondary-text active:text-ig-secondary-text-pressed cursor-pointer p-2'
                    onClick={() => {
                      textareaRef.current?.focus();
                    }}
                  >
                    <CommentIcon type={'comment'} size={24} />
                  </button>
                  {authenticatedUser.id !== post.author.id && (
                    <button className='hover:text-ig-secondary-text active:text-ig-secondary-text-pressed cursor-pointer p-2'>
                      <ShareIcon />
                    </button>
                  )}
                </div>
                <SavePost postId={post.id} />
              </section>

              <section className='mb-4 flex flex-col px-4 text-sm'>
                {post.likes.length <= 0 ? (
                  <span className='text-sm'>
                    Be te first to{' '}
                    <button
                      className='hover:text-ig-secondary-button-hover active:text-ig-secondary-button-pressed text-ig-secondary-button cursor-pointer font-semibold'
                      onClick={() => likePost(post.id, authenticatedUser.id)}
                    >
                      like this
                    </button>
                  </span>
                ) : (
                  <div>
                    <button
                      onClick={() => openModal()}
                      className='cursor-pointer text-sm leading-[18px] font-semibold'
                    >
                      {post.likes.length}{' '}
                      {post.likes.length <= 1 ? 'like' : 'likes'}
                    </button>

                    <Modal isOpen={isOpen} closeModal={closeModal}>
                      <LikesModalContent
                        closeModal={closeModal}
                        likes={post.likes}
                        authenticatedUserId={authenticatedUser.id}
                      />
                    </Modal>
                  </div>
                )}

                <time
                  className='text-ig-secondary-text text-xs'
                  title={getExactDate(post.createdAt.toString())}
                >
                  {formatPostDate(post.createdAt)}
                </time>
              </section>
            </div>

            <section className='flex py-[6px] pr-4'>
              <button className='text-ig-secondary-button active:text-ig-secondary-button-pressed cursor-pointer px-4 py-2'>
                <EmojiIcon size={24} />
              </button>

              <CommentForm
                postId={post.id}
                userId={authenticatedUser.id}
                ref={textareaRef}
                replyToCommentId={replyToCommentId}
                setReplyToCommentId={setReplyToCommentId}
                setShowReplies={setShowReplies}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
