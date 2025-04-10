'use client';

import Link from 'next/link';
import { CommentIcon } from '@/assets/icons/post/CommentIcon';
import { EmojiIcon } from '@/assets/icons/post/EmojiIcon';
import { HeartIcon } from '@/assets/icons/post/HeartIcon';
import { MoreOptionsIcon } from '@/assets/icons/post/MoreOptionsIcon';
import { SaveIcon } from '@/assets/icons/post/SaveIcon';
import { ShareIcon } from '@/assets/icons/post/ShareIcon';
import { User } from '@/interfaces/user.interface';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';

interface Props {
  user: User;
}

export const Post = ({ user }: Props) => {
  return (
    <>
      <div className="border-border mx-auto mb-5 w-full max-w-[470px] border-b px-4 pb-4 sm:px-0">
        <div className="flex w-full items-center pb-[14px] pl-1">
          <div className="mr-3">
            <div className="h-8 w-8">
              <ProfilePhoto
                profile_photo={user.profile_photo}
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
          <div className="flex w-full items-baseline gap-x-1">
            <span className="text-sm leading-[18px]">{user.username}</span>

            <span className="flex items-center justify-center">•</span>

            <time
              dateTime="2025-03-31T15:30:23.000Z"
              className="text-secondary text-sm leading-[18px]"
              title="Mar 31, 2025"
            >
              1d
            </time>
          </div>

          <div className="flex w-8 justify-end">
            <MoreOptionsIcon />
          </div>
        </div>

        <div className="min-[485px]:border-border aspect-468/585 w-full min-[485px]:rounded-[4px] min-[485px]:border"></div>

        <div className="flex w-full flex-col">
          <div className="flex justify-between py-1">
            <div className="flex">
              <div className="py-2 pr-2">
                <HeartIcon />
              </div>
              <div className="p-2">
                <CommentIcon />
              </div>
              <div className="p-2">
                <ShareIcon />
              </div>
            </div>
            <div className="py-2 pl-2">
              <SaveIcon />
            </div>
          </div>

          <div>
            <span className="text-sm leading-[18px] font-semibold">
              100 likes
            </span>
          </div>

          <div className="">
            <div>
              <span className="text-sm leading-[18px] font-semibold">
                {user.username}
              </span>{' '}
              <span className="text-sm">description 👍</span>
            </div>
            <Link
              href={'/explore/tags/some'}
              className="text-blue-hover text-sm leading-[18px]"
            >
              #some
            </Link>
          </div>

          <div>
            <Link href={''} className="text-secondary text-sm leading-[18px]">
              View all 50 comments
            </Link>
          </div>

          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              className="text-secondary p-1 md:order-2"
              aria-label="Add emoji"
            >
              <EmojiIcon />
            </button>

            <form className="flex flex-1 items-center">
              <textarea
                name="comment"
                id="comment"
                placeholder="Add a comment..."
                rows={1}
                className="max-h-[120px] min-h-[18px] w-full flex-1 resize-none overflow-y-auto border-none bg-transparent text-sm outline-none placeholder:text-gray-400 focus:ring-0"
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
