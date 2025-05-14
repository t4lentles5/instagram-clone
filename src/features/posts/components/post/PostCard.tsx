'use client';

import Link from 'next/link';

import { getExactDate } from '@/features/posts/utils/get-exact-date';
import { formatDate } from '@/features/posts/utils/format-date';
import { getAspectClass } from '@/features/posts/utils/get-aspect-class';

import { likePost } from '@/features/posts/actions/like-post';
import { useUserStore } from '@/core/store/user/user-store';

import { Post } from '@/core/shared/interfaces/post.interface';

import { PostCarousel } from '@/features/posts/components/post/PostCarousel';
import { LikeButton } from '@/features/posts/components/likes/LikeButton';
import { CommentSection } from '@/features/posts/components/comments/CommentSection';
import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';

import { useModal } from '@/core/shared/hooks/useModal';
import { Modal } from '@/core/shared/components/Modal';

import {
  CommentIcon,
  MoreOptionsIcon,
  SaveIcon,
  ShareIcon,
} from '@/core/shared/icons';
import { LikesModalContent } from '../likes/LikesModalContent';

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  const { authenticatedUser } = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();

  const { aspect_ratio, first_image_dimensions } = post;
  const aspect_ratio_image = getAspectClass(
    aspect_ratio,
    first_image_dimensions!,
  );

  const hasLiked = post.likes.some(
    (like) => like.user.id === authenticatedUser.id,
  );

  return (
    <>
      <article className='border-ig-separator mx-auto mb-5 w-full max-w-[470px] px-0 pb-2 min-[480px]:border-b min-[480px]:pb-4 sm:px-0 [480px]:px-4'>
        <section className='flex w-full items-center pr-[16px] pb-[14px] pl-[17px] min-[480px]:pr-0 min-[480px]:pl-1'>
          <div className='mr-3'>
            <div className='h-8 w-8'>
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
            </div>
          </div>
          <div className='flex w-full items-baseline gap-x-1'>
            <Link
              href={`/${post.author.username}`}
              className='max-w-36 truncate overflow-hidden text-sm leading-[18px] font-semibold'
            >
              {post.author.username}
            </Link>

            <span className='text-ig-secondary-text flex items-center justify-center'>
              •
            </span>

            <time
              className='text-ig-secondary-text text-sm leading-[18px]'
              title={getExactDate(post.createdAt.toString())}
            >
              {formatDate(post.createdAt.toString())}
            </time>
          </div>

          <button className='flex w-8 cursor-pointer justify-end'>
            <MoreOptionsIcon />
          </button>
        </section>

        <div
          className='border-ig-separator bg-web-always-black relative overflow-hidden min-[480px]:rounded-[4px] min-[480px]:border'
          style={{ aspectRatio: aspect_ratio_image }}
          onDoubleClick={() => {
            if (!hasLiked) {
              likePost(post.id, authenticatedUser.id);
            }
          }}
        >
          <PostCarousel images={post.postImages.map((img) => img.imageUrl)} />
        </div>

        <div className='flex w-full flex-col px-4 min-[480px]:px-0'>
          <section className='flex justify-between py-1'>
            <div className='flex'>
              <LikeButton post={post} userId={authenticatedUser.id} />
              <Link
                href={`/p/${post.id}`}
                className='hover:text-ig-secondary-text active:text-ig-secondary-text-pressed cursor-pointer p-2'
              >
                <CommentIcon type={'comment'} size={24} />
              </Link>
              {authenticatedUser.id !== post.author.id && (
                <button className='hover:text-ig-secondary-text active:text-ig-secondary-text-pressed cursor-pointer p-2'>
                  <ShareIcon />
                </button>
              )}
            </div>
            <button className='hover:text-ig-secondary-text active:text-ig-secondary-text-pressed cursor-pointer py-2 pl-2'>
              <SaveIcon />
            </button>
          </section>

          {post.likes.length > 0 && (
            <section>
              <button
                onClick={() => openModal()}
                className='cursor-pointer text-sm leading-[18px] font-semibold'
              >
                {post.likes.length} {post.likes.length <= 1 ? 'like' : 'likes'}
              </button>

              {isOpen && (
                <Modal isOpen={isOpen} closeModal={closeModal}>
                  <LikesModalContent
                    closeModal={closeModal}
                    likes={post.likes}
                    authenticatedUserId={authenticatedUser.id}
                  />
                </Modal>
              )}
            </section>
          )}

          {post.caption && (
            <section>
              <div>
                <span className='text-sm leading-[18px] font-semibold'>
                  {post.author.username}
                </span>{' '}
                <span className='text-sm'>{post.caption}</span>
              </div>
              <Link
                href={'/explore/tags/some'}
                className='text-ig-colors-button-borderless-text active:text-ig-colors-button-borderless-text-pressed text-sm leading-[18px]'
              >
                #some
              </Link>
            </section>
          )}

          {post.comments.length > 0 && (
            <section>
              <Link
                href={`/p/${post.id}`}
                className='text-ig-secondary-text text-sm leading-[18px]'
              >
                View {post.comments.length > 1 && 'all'} {post.comments.length}{' '}
                {post.comments.length > 1 ? 'comments' : 'comment'}
              </Link>
            </section>
          )}

          <CommentSection postId={post.id} userId={authenticatedUser.id} />
        </div>
      </article>
    </>
  );
};
