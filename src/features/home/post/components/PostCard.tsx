'use client';

import Link from 'next/link';

import { getExactDate } from '@/utils/get-exact-date';
import { formatDate } from '@/utils/format-date';

import { Post } from '@/interfaces/post.interface';

import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { PostCarousel } from '@/features/home/post/components/PostCarousel';

import { CommentIcon } from '@/components/icons/CommentIcon';
import { EmojiPostIcon } from '@/features/home/post/icons/EmojiPostIcon';
import { SaveIcon } from '@/components/icons/SaveIcon';
import { ShareIcon } from '@/components/icons/ShareIcon';
import { LikeIcon } from '@/components/icons/LikeIcon';
import { MoreOptions24 } from '@/components/icons/MoreOptions24';

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  const getAspectClass = () => {
    if (post.aspect_ratio === 'square') return '1';
    if (post.aspect_ratio === 'portrait') return '4/5';
    if (post.aspect_ratio === 'video') return '16/9';
    if (post.aspect_ratio === 'original') return post.first_image_dimensions!;
  };

  const aspect_ratio_image = getAspectClass();

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
            <span className='text-sm leading-[18px]'>
              {post.author.username}
            </span>

            <span className='flex items-center justify-center'>•</span>

            <time
              dateTime='2025-03-31T15:30:23.000Z'
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

        <PostCarousel
          images={post.PostImages.map((img) => img.imageUrl)}
          aspect_ratio_image={aspect_ratio_image}
        />

        <div className='flex w-full flex-col'>
          <div className='flex justify-between py-1'>
            <div className='flex'>
              <div className='py-2 pr-2'>
                <LikeIcon />
              </div>
              <div className='p-2'>
                <CommentIcon />
              </div>
              <div className='p-2'>
                <ShareIcon />
              </div>
            </div>
            <div className='py-2 pl-2'>
              <SaveIcon />
            </div>
          </div>

          <div>
            <span className='text-sm leading-[18px] font-semibold'>
              100 likes
            </span>
          </div>

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

          <div>
            <Link href={''} className='text-secondary text-sm leading-[18px]'>
              View all 50 comments
            </Link>
          </div>

          <div className='flex w-full items-center justify-between'>
            <button
              type='button'
              className='text-secondary p-1 md:order-2'
              aria-label='Add emoji'
            >
              <EmojiPostIcon />
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
