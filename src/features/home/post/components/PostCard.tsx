'use client';

import { useState } from 'react';
import Link from 'next/link';

import { getExactDate } from '@/utils/get-exact-date';
import { formatDate } from '@/utils/format-date';
import { getAspectClass } from '@/utils/get-aspect-class';

import { likePost } from '@/actions/post/like-post';

import { Post } from '@/interfaces/post.interface';
import { User } from '@/interfaces/user.interface';

import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { PostCarousel } from '@/features/home/post/components/PostCarousel';
import { LikesModal } from './LikesModal';
import { LikeButton } from '@/features/home/post/components/LikeButton';

import { CommentIcon } from '@/features/home/post/icons/CommentIcon';
import { EmojiIcon13 } from '@/features/home/post/icons/EmojiIcon13';
import { SaveIcon } from '@/features/home/post/icons/SaveIcon';
import { ShareIcon } from '@/features/home/post/icons/ShareIcon';
import { MoreOptions24 } from '@/features/home/post/icons/MoreOptions24';

interface Props {
  post: Post;
  userId: User['id'];
}

export const PostCard = ({ post, userId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { aspect_ratio, first_image_dimensions } = post;
  const aspect_ratio_image = getAspectClass(
    aspect_ratio,
    first_image_dimensions!,
  );

  const hasLiked = post.likes.some((like) => like.user.id === userId);

  return (
    <>
      <div className='border-border mx-auto mb-5 w-full max-w-[470px] border-b px-4 pb-4 sm:px-0'>
        <div className='flex w-full items-center pb-[14px] pl-1'>
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
              className='text-sm leading-[18px] font-semibold'
            >
              {post.author.username}
            </Link>

            <span className='flex items-center justify-center'>•</span>

            <time
              className='text-secondary text-sm leading-[18px]'
              title={getExactDate(post.createdAt.toString())}
            >
              {formatDate(post.createdAt.toString())}
            </time>
          </div>

          <div className='flex w-8 justify-end'>
            <MoreOptions24 />
          </div>
        </div>

        <div
          className='border-border-popover relative overflow-hidden rounded-[4px] border bg-black'
          style={{ aspectRatio: aspect_ratio_image }}
          onDoubleClick={() => {
            if (!hasLiked) {
              likePost(post.id, userId);
            }
          }}
        >
          <PostCarousel images={post.PostImages.map((img) => img.imageUrl)} />
        </div>

        <div className='flex w-full flex-col'>
          <div className='flex justify-between py-1'>
            <div className='flex'>
              <LikeButton post={post} userId={userId} />
              <Link href={`/p/${post.id}`} className='p-2'>
                <CommentIcon />
              </Link>
              <div className='p-2'>
                <ShareIcon />
              </div>
            </div>
            <div className='py-2 pl-2'>
              <SaveIcon />
            </div>
          </div>

          {post.likes.length > 0 && (
            <div>
              <button
                onClick={() => setIsOpen(true)}
                className='cursor-pointer text-sm leading-[18px] font-semibold'
              >
                {post.likes.length} {post.likes.length <= 1 ? 'like' : 'likes'}
              </button>

              {isOpen && (
                <LikesModal
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  likes={post.likes}
                />
              )}
            </div>
          )}

          {post.caption && (
            <div className=''>
              <div>
                <span className='text-sm leading-[18px] font-semibold'>
                  {post.author.username}
                </span>{' '}
                <span className='text-sm'>{post.caption}</span>
              </div>
              <Link
                href={'/explore/tags/some'}
                className='text-blue-hover text-sm leading-[18px]'
              >
                #some
              </Link>
            </div>
          )}

          {post.comments.length > 0 && (
            <Link
              href={`/p/${post.id}`}
              className='text-secondary text-sm leading-[18px]'
            >
              View {post.comments.length > 1 && 'all'} {post.comments.length}{' '}
              {post.comments.length > 1 ? 'comments' : 'comment'}
            </Link>
          )}

          <div className='flex w-full items-center justify-between'>
            <button
              type='button'
              className='text-secondary p-1 md:order-2'
              aria-label='Add emoji'
            >
              <EmojiIcon13 />
            </button>

            <form className='flex flex-1 items-center'>
              <textarea
                name='comment'
                id='comment'
                placeholder='Add a comment...'
                rows={1}
                className='max-h-[120px] min-h-[18px] w-full flex-1 resize-none overflow-y-auto border-none bg-transparent text-sm outline-none placeholder:text-gray-400 focus:ring-0'
                onInput={(e) => {
                  e.currentTarget.style.height = 'auto';
                  e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 120)}px`;
                }}
              />
            </form>

            {/* <button
              type="submit"
              className="ml-2 text-sm font-semibold text-blue-500 opacity-0 transition-opacity duration-200 disabled:opacity-50"
              disabled
              aria-hidden="true"
            >
              Post
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};
